// openapi.ts

export const openApiDoc = {
    openapi: "3.0.0",
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation for your service",
    },
    paths: {
        "/api/profile": {
            get: {
                summary: "Get User Profile",
                responses: {
                    "200": {
                        description: "Profile retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        profileComplete: { type: "boolean" },
                                        userDetails: { type: ["object", "null"] },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                },
            },
            post: {
                summary: "Create or Update User Profile",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                additionalProperties: true,
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Profile updated successfully",
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                    "500": {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/events": {
            post: {
                summary: "Create Event",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" },
                                    date: { type: "string", format: "date-time" },
                                    image: { type: "string" },
                                },
                                required: ["title", "description", "date"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Event created successfully",
                    },
                    "500": {
                        description: "Failed to create event",
                    },
                },
            },
            get: {
                summary: "Get all events",
                responses: {
                    "200": {
                        description: "List of all events",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        events: {
                                            type: "array",
                                            items: {
                                                type: "object", // You can define event fields here
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "500": { description: "Internal Server Error" },
                },
            },
        },
        "/api/register": {
            put: {
                summary: "Register User for Event",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    eventId: { type: "string" },
                                },
                                required: ["eventId"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User registered for event",
                    },
                    "400": {
                        description: "Already registered",
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                    "500": {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/api/": {
            get: {
                summary: "Root Endpoint",
                responses: {
                    "200": {
                        description: "Hello message",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};