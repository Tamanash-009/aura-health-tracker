package com.aurahealth.health.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MetricType type;

    @NotNull
    @Positive(message = "Value must be positive")
    @Column(nullable = false)
    private Double value;

    @NotBlank
    private String unit;

    @NotNull
    @Column(name = "measured_at", nullable = false)
    private LocalDateTime measuredAt;

    @Builder.Default
    @Column(name = "source")
    private String source = "MANUAL";
    
    @AssertTrue(message = "Heart rate must be between 30 and 220 BPM")
    private boolean isHeartRateValid() {
        if (type == MetricType.HEART_RATE) {
            return value >= 30 && value <= 220;
        }
        return true;
    }

    @AssertTrue(message = "Daily steps cannot exceed 100,000 realistically")
    private boolean isStepsValid() {
        if (type == MetricType.STEPS) {
            return value >= 0 && value <= 100000;
        }
        return true;
    }
    
    public enum MetricType {
        HEART_RATE, STEPS, SLEEP, WEIGHT
    }
}
