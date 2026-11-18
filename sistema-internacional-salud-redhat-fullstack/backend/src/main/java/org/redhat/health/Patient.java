package org.redhat.health;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "patients")
public class Patient extends PanacheEntity {

    @Column(unique = true, nullable = false)
    public String fhirId;

    @Column(nullable = false)
    public String fullName;

    @Column(nullable = false)
    public String country;

    @Column(nullable = false)
    public String bloodType;

    public String allergies;

    public String status;

    public static Patient findByFhirId(String fhirId) {
        return find("fhirId", fhirId).firstResult();
    }
}
