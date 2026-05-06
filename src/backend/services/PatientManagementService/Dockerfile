# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["src/backend/services/PatientManagementService/PatientManagementService.csproj", "src/backend/services/PatientManagementService/"]
RUN dotnet restore "src/backend/services/PatientManagementService/PatientManagementService.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/app/src/backend/services/PatientManagementService"
RUN dotnet build "PatientManagementService.csproj" -c Release -o /app/build

# Publish Stage
FROM build AS publish
RUN dotnet publish "PatientManagementService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Environment variables for production
ENV ASPNETCORE_URLS=http://+:5002
EXPOSE 5002

ENTRYPOINT ["dotnet", "PatientManagementService.dll"]
