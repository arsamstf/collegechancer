package com.arsalaan.collegechancer.model;

public class CollegeStats {
    private final String schoolName;
    private final double admissionRate;
    private final Integer sat25;
    private final Integer sat75;
    private final Integer act25;
    private final Integer act75;

    public CollegeStats(String schoolName, double admissionRate,
                        Integer sat25, Integer sat75,
                        Integer act25, Integer act75) {
        this.schoolName = schoolName;
        this.admissionRate = admissionRate;
        this.sat25 = sat25;
        this.sat75 = sat75;
        this.act25 = act25;
        this.act75 = act75;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public double getAdmissionRate() {
        return admissionRate;
    }

    public Integer getSat25() {
        return sat25;
    }

    public Integer getSat75() {
        return sat75;
    }

    public Integer getAct25() {
        return act25;
    }

    public Integer getAct75() {
        return act75;
    }

    public boolean hasSatRange() {
        return sat25 != null && sat75 != null;
    }

    public boolean hasActRange() {
        return act25 != null && act75 != null;
    }
}
