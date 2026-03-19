package com.arsalaan.collegechancer.model;

public class StudentProfile {
    private final double gpa;
    private final int sat;
    private final int act;
    private final int activities;
    private final int leadership;
    private final int awards;
    private final TestChoice testChoice;

    public StudentProfile(double gpa, int sat, int act,
                          int activities, int leadership, int awards,
                          TestChoice testChoice) {
        this.gpa = gpa;
        this.sat = sat;
        this.act = act;
        this.activities = activities;
        this.leadership = leadership;
        this.awards = awards;
        this.testChoice = testChoice;
    }

    public double getGpa() {
        return gpa;
    }

    public int getSat() {
        return sat;
    }

    public int getAct() {
        return act;
    }

    public int getActivities() {
        return activities;
    }

    public int getLeadership() {
        return leadership;
    }

    public int getAwards() {
        return awards;
    }

    public TestChoice getTestChoice() {
        return testChoice;
    }

    public int extracurricularScore() {
        return activities + (2 * leadership) + (3 * awards);
    }
}
