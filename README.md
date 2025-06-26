# Duel Tech Take-Home Task

## Approach

This repo sets up a simple REST API that exposes endpoints for freely searching the advocates dataset and for fetching engagement metrics for a user or platform(s).

It uses Meilisearch, a search engine similar to Elasticsearch, as a datastore. Meilisearch requires minimal setup to get going for basic search tasks. With some extra setup it can be powerful, for example it can expose an MCP server for use with LLM's to create conversational search, which would improve my API beyond the basic endpoints I have provided.

## Setup

The repo is packaged with a Docker Compose file, simply run:

```sh
docker compose up
```

## Routes

### Get list of advocates (paginated)

```
GET http://localhost:3000/api/advocates

Query params:
- filter?: string
- limit?: number // default 20
- offset?: number // default 0

Example: GET http://localhost:3000/api/advocates/search?filter=instagram_handle%3DDylanRodgers98
Example: GET http://localhost:3000/api/advocates/search?limit=10&offset=40
```

### Search advocates

```
GET http://localhost:3000/api/advocates/search

Query params:
- query: string
- sort?: string

Example: GET http://localhost:3000/api/advocates/search?query=dylan&sort=joined_at:asc
```

### Get engagement metrics for an advocate

```
GET http://localhost:3000/api/metrics/engagement/advocate/:advocateId

Example: GET http://localhost:3000/api/metrics/engagement/advocate/9c548567-ae6c-48ce-8fe8-da336b65440e
```

### Get engagement metrics for a platform

```
GET http://localhost:3000/api/metrics/engagement/platform/:platformId

Example: GET http://localhost:3000/api/metrics/engagement/platform/instagram
```

### Get engagement metrics for all platforms

```
GET http://localhost:3000/api/metrics/engagement/platform
```
