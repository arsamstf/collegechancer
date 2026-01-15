import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Main {

    // ===================== DATA MODEL =====================
    static class CollegeStats {
        String schoolName;
        double admissionRate;
        Integer sat25, sat75;
        Integer act25, act75;

        CollegeStats(String schoolName, double admissionRate,
                     Integer sat25, Integer sat75,
                     Integer act25, Integer act75) {
            this.schoolName = schoolName;
            this.admissionRate = admissionRate;
            this.sat25 = sat25;
            this.sat75 = sat75;
            this.act25 = act25;
            this.act75 = act75;
        }

        boolean hasSatRange() { return sat25 != null && sat75 != null; }
        boolean hasActRange() { return act25 != null && act75 != null; }
    }

    // ===================== COLLEGE SELECTION MENU =====================
    static String chooseCollege(Scanner scanner) {
        String[] schools = {
                "Stanford University",
                "University of Minnesota Twin Cities",
                "University of Southern California",
                "University of Wisconsin Madison"
        };

        System.out.println("\nChoose a college:");
        for (int i = 0; i < schools.length; i++) {
            System.out.println((i + 1) + ") " + schools[i]);
        }
        System.out.println((schools.length + 1) + ") Enter a different college");

        System.out.print("\nEnter choice: ");
        int choice = scanner.nextInt();
        scanner.nextLine(); // consume newline

        if (choice >= 1 && choice <= schools.length) {
            return schools[choice - 1];
        } else {
            System.out.print("Enter the college name: ");
            return scanner.nextLine();
        }
    }

    // ===================== API FETCH =====================
    static CollegeStats fetchCollegeStatsFromWeb(String collegeName) {
        try {
            // FIX: Use the ENV VAR NAME, not the key itself
            String apiKey = System.getenv("SCORECARD_API_KEY");
            if (apiKey == null || apiKey.isBlank()) {
                System.out.println("ERROR: SCORECARD_API_KEY not set.");
                return new CollegeStats(collegeName, -1, null, null, null, null);
            }

            String fields = String.join(",",
                    "school.name",
                    "latest.admissions.admission_rate.overall",

                    // SAT percentiles (if available)
                    "latest.admissions.sat_scores.25th_percentile.math",
                    "latest.admissions.sat_scores.75th_percentile.math",
                    "latest.admissions.sat_scores.25th_percentile.critical_reading",
                    "latest.admissions.sat_scores.75th_percentile.critical_reading",

                    // SAT average fallback
                    "latest.admissions.sat_scores.average.overall",

                    // ACT percentiles
                    "latest.admissions.act_scores.25th_percentile.cumulative",
                    "latest.admissions.act_scores.75th_percentile.cumulative",

                    // ACT midpoint fallback
                    "latest.admissions.act_scores.midpoint.cumulative"
            );


            // FIX: use school.search (more flexible than exact name match)
            String query =
                    "school.search=" + URLEncoder.encode(collegeName, StandardCharsets.UTF_8) +
                            "&fields=" + URLEncoder.encode(fields, StandardCharsets.UTF_8) +
                            "&per_page=1" +
                            "&api_key=" + URLEncoder.encode(apiKey, StandardCharsets.UTF_8);

            URI uri = URI.create("https://api.data.gov/ed/collegescorecard/v1/schools?" + query);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder(uri).GET().build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // FIX: show HTTP failures (401/403/429/etc.)
            if (response.statusCode() != 200) {
                System.out.println("API request failed: HTTP " + response.statusCode());
                System.out.println("Raw response: " + response.body());
                return new CollegeStats(collegeName, -1, null, null, null, null);
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.body());

            // FIX: handle empty/missing results (prevents r=null crash)
            JsonNode results = root.path("results");
            if (!results.isArray() || results.isEmpty()) {
                System.out.println("No results found for: " + collegeName);
                System.out.println("Raw response: " + response.body());
                return new CollegeStats(collegeName, -1, null, null, null, null);
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

// SAT average fallback
            Integer satAvg = intOrNull(r.at("/latest/admissions/sat_scores/average/overall"));

            Integer act25 = intOrNull(r.at("/latest/admissions/act_scores/25th_percentile/cumulative"));
            Integer act75 = intOrNull(r.at("/latest/admissions/act_scores/75th_percentile/cumulative"));

// ACT midpoint fallback
            Integer actMid = intOrNull(r.at("/latest/admissions/act_scores/midpoint/cumulative"));


            return new CollegeStats(name, rate, sat25, sat75, act25, act75);

        } catch (Exception e) {
            System.out.println("Failed to fetch stats: " + e.getMessage());
            return new CollegeStats(collegeName, -1, null, null, null, null);
        }
    }

    static Integer intOrNull(JsonNode n) {
        return (n == null || n.isMissingNode() || n.isNull()) ? null : n.asInt();
    }

    static Integer sum(Integer a, Integer b) {
        return (a == null || b == null) ? null : a + b;
    }

    enum TestChoice { SAT_ONLY, ACT_ONLY, BOTH }

    static TestChoice chooseTestType(Scanner scanner) {
        System.out.println("\nWhich test score(s) do you have?");
        System.out.println("1) SAT only");
        System.out.println("2) ACT only");
        System.out.println("3) Both SAT and ACT");
        System.out.print("Enter choice: ");

        int choice = scanner.nextInt();
        scanner.nextLine(); // consume newline

        if (choice == 1) return TestChoice.SAT_ONLY;
        if (choice == 2) return TestChoice.ACT_ONLY;
        return TestChoice.BOTH; // default to BOTH if anything else
    }


    static String fitLabel(CollegeStats s, int sat, int act, TestChoice choice) {

        // If user has SAT (SAT only or BOTH) and the school provides SAT range, use it
        if ((choice == TestChoice.SAT_ONLY || choice == TestChoice.BOTH) && s.hasSatRange()) {
            if (sat >= s.sat75) return "Safety";
            if (sat >= s.sat25) return "Target";
            return "Reach";
        }

        // If user has ACT (ACT only or BOTH) and the school provides ACT range, use it
        if ((choice == TestChoice.ACT_ONLY || choice == TestChoice.BOTH) && s.hasActRange()) {
            if (act >= s.act75) return "Safety";
            if (act >= s.act25) return "Target";
            return "Reach";
        }

        // If BOTH but one test range is missing, try the other
        if (choice == TestChoice.BOTH) {
            if (s.hasSatRange()) {
                if (sat >= s.sat75) return "Safety";
                if (sat >= s.sat25) return "Target";
                return "Reach";
            }
            if (s.hasActRange()) {
                if (act >= s.act75) return "Safety";
                if (act >= s.act25) return "Target";
                return "Reach";
            }
        }

        // Fallback if no test range data exists
        return (s.admissionRate >= 0 && s.admissionRate < 0.20) ? "Likely Reach" : "Uncertain";
    }


    // ===================== MAIN =====================
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter your GPA: ");
        double gpa = scanner.nextDouble();

        TestChoice testChoice = chooseTestType(scanner);

        int sat = -1; // -1 means "not provided"
        int act = -1;

        if (testChoice == TestChoice.SAT_ONLY || testChoice == TestChoice.BOTH) {
            System.out.print("Enter your SAT score: ");
            sat = scanner.nextInt();
        }

        if (testChoice == TestChoice.ACT_ONLY || testChoice == TestChoice.BOTH) {
            System.out.print("Enter your ACT score: ");
            act = scanner.nextInt();
        }


        System.out.print("Number of extracurricular activities: ");
        int activities = scanner.nextInt();

        System.out.print("Leadership positions held: ");
        int leadership = scanner.nextInt();

        System.out.print("Awards received: ");
        int awards = scanner.nextInt();

        int extraScore = activities + (2 * leadership) + (3 * awards);
        System.out.println("Extracurricular score: " + extraScore);

        String collegeName = chooseCollege(scanner);

        System.out.println("\nFetching stats for " + collegeName + "...");
        CollegeStats stats = fetchCollegeStatsFromWeb(collegeName);

        System.out.println("\nMatched school: " + stats.schoolName);
        if (stats.admissionRate >= 0)
            System.out.printf("Acceptance rate: %.2f%%%n", stats.admissionRate * 100);

        if (stats.hasSatRange()) {
            System.out.println("SAT 25–75: " + stats.sat25 + " – " + stats.sat75);
        } else {
            System.out.println("SAT 25–75: N/A");
        }

        if (stats.hasActRange()) {
            System.out.println("ACT 25–75: " + stats.act25 + " – " + stats.act75);
        } else {
            System.out.println("ACT 25–75: N/A");
        }


        System.out.println("\nResult: " + fitLabel(stats, sat, act, testChoice));


        scanner.close();
    }
}
