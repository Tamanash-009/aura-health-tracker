package com.aurahealth.health.controller;

import com.aurahealth.health.model.HealthMetric;
import com.aurahealth.health.repository.HealthMetricRepository;
import com.aurahealth.user.model.User;
import com.aurahealth.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/health")
public class HealthMetricController {

    private final HealthMetricRepository healthMetricRepository;
    private final UserRepository userRepository;

    public HealthMetricController(HealthMetricRepository healthMetricRepository, UserRepository userRepository) {
        this.healthMetricRepository = healthMetricRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<HealthMetric> getUserMetrics(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        ensureUserExists(jwt);
        return healthMetricRepository.findByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<HealthMetric> addMetric(@AuthenticationPrincipal Jwt jwt, @RequestBody HealthMetric metric) {
        String userId = jwt.getSubject();
        ensureUserExists(jwt);

        metric.setUserId(userId);
        metric.setMeasuredAt(LocalDateTime.now());

        return ResponseEntity.ok(healthMetricRepository.save(metric));
    }

    // Sync Clerk User to local DB if not exists
    private void ensureUserExists(Jwt jwt) {
        String userId = jwt.getSubject();
        if (userRepository.existsById(userId)) {
            return;
        }

        // Create new user from JWT claims
        User newUser = User.builder()
                .id(userId)
                .username(
                        jwt.getClaimAsString("preferred_username") != null ? jwt.getClaimAsString("preferred_username")
                                : "user_" + userId.substring(0, 5))
                .email(jwt.getClaimAsString("email")) // Clerk might not send email in basic token, handle accordingly
                .build();

        // Note: For email, we might need a custom claim or just rely on ID for now if
        // email is null
        if (newUser.getEmail() == null) {
            newUser.setEmail(userId + "@clerk.user");
        }

        userRepository.save(newUser);
    }
}
