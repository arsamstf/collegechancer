package com.arsalaan.collegechancer.service;

import com.arsalaan.collegechancer.model.CollegeStats;
import com.arsalaan.collegechancer.model.StudentProfile;
import com.arsalaan.collegechancer.model.TestChoice;

public class FitEvaluator {

    public String fitLabel(CollegeStats stats, StudentProfile profile) {
        int sat = profile.getSat();
        int act = profile.getAct();
        TestChoice choice = profile.getTestChoice();

        if ((choice == TestChoice.SAT_ONLY || choice == TestChoice.BOTH) && stats.hasSatRange()) {
            if (sat >= stats.getSat75()) return "Safety";
            if (sat >= stats.getSat25()) return "Target";
            return "Reach";
        }

        if ((choice == TestChoice.ACT_ONLY || choice == TestChoice.BOTH) && stats.hasActRange()) {
            if (act >= stats.getAct75()) return "Safety";
            if (act >= stats.getAct25()) return "Target";
            return "Reach";
        }

        if (choice == TestChoice.BOTH) {
            if (stats.hasSatRange()) {
                if (sat >= stats.getSat75()) return "Safety";
                if (sat >= stats.getSat25()) return "Target";
                return "Reach";
            }
            if (stats.hasActRange()) {
                if (act >= stats.getAct75()) return "Safety";
                if (act >= stats.getAct25()) return "Target";
                return "Reach";
            }
        }

        return (stats.getAdmissionRate() >= 0 && stats.getAdmissionRate() < 0.20) ? "Likely Reach" : "Uncertain";
    }
}
