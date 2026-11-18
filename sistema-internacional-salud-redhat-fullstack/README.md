# Sistema Internacional de Salud (HIS) - Arquitectura Red Hat OpenShift

Proyecto completo de tres capas listo para compilar y desplegar en **Red Hat OpenShift**:
1. **Frontend (`frontend/`)**: React + Vite + Nginx sobre **Red Hat UBI 9** (`ubi9/nodejs-20` y `ubi9/nginx-124`).
2. **Backend (`backend/`)**: API REST con **Red Hat Build of Quarkus** (Java 21) + Hibernate ORM Panache + soporte HL7 FHIR.
3. **Base de Datos y Despliegue (`openshift/openshift-full-stack.yaml`)**: Manifiesto integral con **PostgreSQL 16 (RHEL 9)**, `PersistentVolumeClaim`, `Secret`, `ConfigMap`, `Deployments`, `Services` y `Routes` TLS.

## Despliegue Rápido en Red Hat OpenShift

```bash
# 1. Crear proyecto en OpenShift
oc new-project health-ns

# 2. Construir imagen del Backend en el registro interno
oc new-build --name=health-backend-quarkus --binary --strategy=docker
oc start-build health-backend-quarkus --from-dir=./backend --follow

# 3. Construir imagen del Frontend en el registro interno
oc new-build --name=health-frontend-react --binary --strategy=docker
oc start-build health-frontend-react --from-dir=./frontend --follow

# 4. Desplegar Base de Datos + Backend + Frontend
oc apply -f openshift/openshift-full-stack.yaml

# 5. Verificar estado y obtener URL pública
oc get pods -w
oc get route health-portal-route
```
