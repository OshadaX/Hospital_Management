# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["src/backend/services/LabTestManagementService/LabTestManagementService.csproj", "src/backend/services/LabTestManagementService/"]
RUN dotnet restore "src/backend/services/LabTestManagementService/LabTestManagementService.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/app/src/backend/services/LabTestManagementService"
RUN dotnet build "LabTestManagementService.csproj" -c Release -o /app/build

# Publish Stage
FROM build AS publish
RUN dotnet publish "LabTestManagementService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Environment variables for production
ENV ASPNETCORE_URLS=http://+:5002
EXPOSE 5002

ENTRYPOINT ["dotnet", "LabTestManagementService.dll"]
