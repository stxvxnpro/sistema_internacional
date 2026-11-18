FROM registry.access.redhat.com/ubi9/openjdk-21:latest AS build
WORKDIR /opt/app-root/src
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

FROM registry.access.redhat.com/ubi9/openjdk-21-runtime:latest
WORKDIR /deployments
COPY --from=build /opt/app-root/src/target/quarkus-app/lib/ /deployments/lib/
COPY --from=build /opt/app-root/src/target/quarkus-app/*.jar /deployments/
COPY --from=build /opt/app-root/src/target/quarkus-app/app/ /deployments/app/
COPY --from=build /opt/app-root/src/target/quarkus-app/quarkus/ /deployments/quarkus/
EXPOSE 8080
USER 185
ENV JAVA_OPTS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENTRYPOINT ["java", "-jar", "/deployments/quarkus-run.jar"]
