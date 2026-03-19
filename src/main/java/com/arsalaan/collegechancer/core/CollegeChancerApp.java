package com.arsalaan.collegechancer.core;

import com.arsalaan.collegechancer.model.CollegeStats;
import com.arsalaan.collegechancer.model.StudentProfile;
import com.arsalaan.collegechancer.model.TestChoice;
import com.arsalaan.collegechancer.service.CollegeScorecardClient;
import com.arsalaan.collegechancer.service.FitEvaluator;
import com.arsalaan.collegechancer.ui.ConsolePrompts;

import java.util.Scanner;

public class CollegeChancerApp {
    private final ConsolePrompts prompts;
    private final CollegeScorecardClient scorecardClient;
    private final FitEvaluator fitEvaluator;

    public CollegeChancerApp() {
        this.prompts = new ConsolePrompts();
        this.scorecardClient = new CollegeScorecardClient();
        this.fitEvaluator = new FitEvaluator();
    }

    public void run() {
        try (Scanner scanner = new Scanner(System.in)) {
            double gpa = prompts.askGpa(scanner);
            TestChoice testChoice = prompts.chooseTestType(scanner);

            int sat = -1;
            int act = -1;

            if (testChoice == TestChoice.SAT_ONLY || testChoice == TestChoice.BOTH) {
                sat = prompts.askSat(scanner);
            }

            if (testChoice == TestChoice.ACT_ONLY || testChoice == TestChoice.BOTH) {
                act = prompts.askAct(scanner);
            }

            int activities = prompts.askActivities(scanner);
            int leadership = prompts.askLeadership(scanner);
            int awards = prompts.askAwards(scanner);

            StudentProfile profile = new StudentProfile(gpa, sat, act, activities, leadership, awards, testChoice);
            prompts.printExtracurricularScore(profile.extracurricularScore());

            String collegeName = prompts.chooseCollege(scanner);
            prompts.printStatsHeader(collegeName);

            CollegeStats stats = scorecardClient.fetchCollegeStats(collegeName);
            prompts.printCollegeStats(stats);

            String result = fitEvaluator.fitLabel(stats, profile);
            prompts.printResult(result);
        }
    }
}
