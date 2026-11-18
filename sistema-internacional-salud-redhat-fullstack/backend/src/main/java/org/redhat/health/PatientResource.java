package org.redhat.health;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/v1/patients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PatientResource {

    @GET
    public List<Patient> listAll() {
        return Patient.listAll();
    }

    @GET
    @Path("/{fhirId}")
    public Response getByFhirId(@PathParam("fhirId") String fhirId) {
        Patient patient = Patient.findByFhirId(fhirId);
        if (patient == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(patient).build();
    }

    @POST
    @Transactional
    public Response create(Patient patient) {
        if (patient.status == null || patient.status.isBlank()) {
            patient.status = "ACTIVO";
        }
        patient.persist();
        return Response.status(Response.Status.CREATED).entity(patient).build();
    }
}
