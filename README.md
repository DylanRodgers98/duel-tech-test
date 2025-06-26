# Duel Tech Take-Home Task

## Approach

This repo sets up a simple REST API that exposes endpoints for freely searching the advocates dataset and for fetching engagement metrics for a user or platform(s).

It uses Meilisearch, a search engine similar to Elasticsearch, as a datastore. Meilisearch requires minimal setup to get going for basic search tasks. With some extra setup it can be powerful, for example it can expose an MCP server for use with LLM's to create conversational search, which would improve my API beyond the basic endpoints I have provided.

## Setup

The repo is packaged with a Docker Compose file, simply run:

```sh
docker compose up
```
