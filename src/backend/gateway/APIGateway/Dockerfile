# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["src/backend/gateway/APIGateway/DoctorManagementService.csproj", "src/backend/gateway/APIGateway/"]
RUN dotnet restore "src/backend/gateway/APIGateway/DoctorManagementService.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/app/src/backend/gateway/APIGateway"
RUN dotnet build "DoctorManagementService.csproj" -c Release -o /app/build

# Publish Stage
FROM build AS publish
RUN dotnet publish "DoctorManagementService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Environment variables for production
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "DoctorManagementService.dll"]
