package com.arsalaan.collegechancer.service;

import com.arsalaan.collegechancer.model.CollegeStats;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class CollegeScorecardClient {
    private final HttpClient httpClient;
    private final ObjectMapper mapper;

    public CollegeScorecardClient() {
        this.httpClient = HttpClient.newHttpClient();
        this.mapper = new ObjectMapper();
    }

    public CollegeStats fetchCollegeStats(String collegeName) {
        try {
            String apiKey = System.getenv("SCORECARD_API_KEY");
            if (apiKey == null || apiKey.isBlank()) {
                System.out.println("ERROR: SCORECARD_API_KEY not set.");
                return emptyStats(collegeName);
            }

            String fields = String.join(",",
                    "school.name",
                    "latest.admissions.admission_rate.overall",
                    "latest.admissions.sat_scores.25th_percentile.math",
                    "latest.admissions.sat_scores.75th_percentile.math",
                    "latest.admissions.sat_scores.25th_percentile.critical_reading",
                    "latest.admissions.sat_scores.75th_percentile.critical_reading",
                    "latest.admissions.sat_scores.average.overall",
                    "latest.admissions.act_scores.25th_percentile.cumulative",
                    "latest.admissions.act_scores.75th_percentile.cumulative",
                    "latest.admissions.act_scores.midpoint.cumulative"
            );

            String query =
                    "school.search=" + URLEncoder.encode(collegeName, StandardCharsets.UTF_8)
                            + "&fields=" + URLEncoder.encode(fields, StandardCharsets.UTF_8)
                            + "&per_page=1"
                            + "&api_key=" + URLEncoder.encode(apiKey, StandardCharsets.UTF_8);

            URI uri = URI.create("https://api.data.gov/ed/collegescorecard/v1/schools?" + query);

            HttpRequest request = HttpRequest.newBuilder(uri).GET().build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                System.out.println("API request failed: HTTP " + response.statusCode());
                System.out.println("Raw response: " + response.body());
                return emptyStats(collegeName);
            }

            JsonNode root = mapper.readTree(response.body());
            JsonNode results = root.path("results");
            if (!results.isArray() || results.isEmpty()) {
                System.out.println("No results found for: " + collegeName);
                System.out.println("Raw response: " + response.body());
                return emptyStats(collegeName);
            }

            JsonNode r = results.get(0);

            String name = r.path("school").path("name").asText(collegeName);
            double rate = r.path("latest").path("admissions")
                    .path("admission_rate").path("overall").asDouble(-1);

            Integer sat25 = sum(
                    intOrNull(r.at("/latest/admissions/sat_scores/25th_percentile/math")),
                    intOrNull(r.at("/latest/admissions/sat_scores/25th_percentile/critical_reading"))
            );
            Integer sat75 = sum(
                    intOrNull(r.at("/latest/admissions/sat_scores/75th_percentile/math")),
                    intOrNull(r.at("/latest/admissions/sat_scores/75th_percentile/critical_reading"))
            );

            Integer act25 = intOrNull(r.at("/latest/admissions/act_scores/25th_percentile/cumulative"));
            Integer act75 = intOrNull(r.at("/latest/admissions/act_scores/75th_percentile/cumulative"));

            return new CollegeStats(name, rate, sat25, sat75, act25, act75);
        } catch (Exception e) {
            System.out.println("Failed to fetch stats: " + e.getMessage());
            return emptyStats(collegeName);
        }
    }

    private static CollegeStats emptyStats(String collegeName) {
        return new CollegeStats(collegeName, -1, null, null, null, null);
    }

    private static Integer intOrNull(JsonNode n) {
        return (n == null || n.isMissingNode() || n.isNull()) ? null : n.asInt();
    }

    private static Integer sum(Integer a, Integer b) {
        return (a == null || b == null) ? null : a + b;
    }
}
