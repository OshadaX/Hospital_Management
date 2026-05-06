# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["src/backend/services/AppointmentManagementService/AppointmentManagementService.csproj", "src/backend/services/AppointmentManagementService/"]
RUN dotnet restore "src/backend/services/AppointmentManagementService/AppointmentManagementService.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/app/src/backend/services/AppointmentManagementService"
RUN dotnet build "AppointmentManagementService.csproj" -c Release -o /app/build

# Publish Stage
FROM build AS publish
RUN dotnet publish "AppointmentManagementService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Environment variables for production
ENV ASPNETCORE_URLS=http://+:5002
EXPOSE 5002

ENTRYPOINT ["dotnet", "AppointmentManagementService.dll"]
