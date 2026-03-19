package com.arsalaan.collegechancer.ui;

import com.arsalaan.collegechancer.model.TestChoice;

import java.util.Scanner;

public class ConsolePrompts {

    public double askGpa(Scanner scanner) {
        System.out.print("Enter your GPA: ");
        return scanner.nextDouble();
    }

    public TestChoice chooseTestType(Scanner scanner) {
        System.out.println("\nWhich test score(s) do you have?");
        System.out.println("1) SAT only");
        System.out.println("2) ACT only");
        System.out.println("3) Both SAT and ACT");
        System.out.print("Enter choice: ");

        int choice = scanner.nextInt();
        scanner.nextLine();

        if (choice == 1) return TestChoice.SAT_ONLY;
        if (choice == 2) return TestChoice.ACT_ONLY;
        return TestChoice.BOTH;
    }

    public int askSat(Scanner scanner) {
        System.out.print("Enter your SAT score: ");
        return scanner.nextInt();
    }

    public int askAct(Scanner scanner) {
        System.out.print("Enter your ACT score: ");
        return scanner.nextInt();
    }

    public int askActivities(Scanner scanner) {
        System.out.print("Number of extracurricular activities: ");
        return scanner.nextInt();
    }

    public int askLeadership(Scanner scanner) {
        System.out.print("Leadership positions held: ");
        return scanner.nextInt();
    }

    public int askAwards(Scanner scanner) {
        System.out.print("Awards received: ");
        return scanner.nextInt();
    }

    public String chooseCollege(Scanner scanner) {
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
        scanner.nextLine();

        if (choice >= 1 && choice <= schools.length) {
            return schools[choice - 1];
        }

        System.out.print("Enter the college name: ");
        return scanner.nextLine();
    }

    public void printStatsHeader(String collegeName) {
        System.out.println("\nFetching stats for " + collegeName + "...");
    }

    public void printCollegeStats(com.arsalaan.collegechancer.model.CollegeStats stats) {
        System.out.println("\nMatched school: " + stats.getSchoolName());
        if (stats.getAdmissionRate() >= 0) {
            System.out.printf("Acceptance rate: %.2f%%%n", stats.getAdmissionRate() * 100);
        }

        if (stats.hasSatRange()) {
            System.out.println("SAT 25-75: " + stats.getSat25() + " - " + stats.getSat75());
        } else {
            System.out.println("SAT 25-75: N/A");
        }

        if (stats.hasActRange()) {
            System.out.println("ACT 25-75: " + stats.getAct25() + " - " + stats.getAct75());
        } else {
            System.out.println("ACT 25-75: N/A");
        }
    }

    public void printExtracurricularScore(int score) {
        System.out.println("Extracurricular score: " + score);
    }

    public void printResult(String label) {
        System.out.println("\nResult: " + label);
    }
}
