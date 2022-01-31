FROM openjdk:11-jdk AS build
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src/ src/
RUN chmod +x gradlew
RUN rm -rf build/generated
RUN ["./gradlew", "clean", "build", "--stacktrace", "--exclude-task", "test"]

FROM openjdk:11-jdk
COPY --from=build /app/build/libs/runner-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT java -jar app.jar
