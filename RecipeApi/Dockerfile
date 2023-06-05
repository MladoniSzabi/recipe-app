FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /App
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY --from=build /App/bin/Release/net6.0/publish .
CMD ["dotnet", "RecipeApi.dll"]