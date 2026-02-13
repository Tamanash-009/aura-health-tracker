package com.aurahealth.health.controller;

import com.aurahealth.health.model.HealthMetric;
import com.aurahealth.health.repository.HealthMetricRepository;
import com.aurahealth.user.model.User;
import com.aurahealth.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/health")
public class HealthMetricController {

    @Autowired
    HealthMetricRepository healthMetricRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<HealthMetric>> getUserMetrics() {
        User user = getCurrentUser();
        return ResponseEntity.ok(healthMetricRepository.findByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<HealthMetric> addMetric(@RequestBody HealthMetric metric) {
        User user = getCurrentUser();
        metric.setUserId(user.getId());
        metric.setMeasuredAt(LocalDateTime.now());
        return ResponseEntity.ok(healthMetricRepository.save(metric));
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
    }
}
