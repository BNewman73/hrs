package com.skillstorm.hrs.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefundResponseDTO {

    private String refundId;
    private String paymentIntentId;
    private String chargeId;
    private Integer amount;
    private String currency;
    private String status;
    private Long created;
}
