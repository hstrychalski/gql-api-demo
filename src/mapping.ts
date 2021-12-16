

export const mapping = {
    "properties": {
        "displayItems": {
            "properties": {
                "id": {
                    "type": "long"
                }
            }
        },
        "id": {
            "type": "long"
        },
        "media": {
            "properties": {
                "id": {
                    "type": "long"
                },
                "product": {
                    "properties": {
                        "id": {
                            "type": "long"
                        }
                    }
                },
                "source": {
                    "properties": {
                        "mediaSize": {
                            "properties": {
                                "maxHeight": {
                                    "type": "long"
                                },
                                "mimeType": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "name": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "quality": {
                                    "type": "long"
                                }
                            }
                        }
                    }
                }
            }
        },
        "name": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "prices": {
            "properties": {
                "id": {
                    "type": "long"
                },
                "price": {
                    "properties": {
                        "currency": {
                            "properties": {
                                "code": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "id": {
                                    "type": "long"
                                },
                                "name": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                }
                            }
                        },
                        "value": {
                            "type": "float"
                        }
                    }
                },
                "pricelist": {
                    "properties": {
                        "comment": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "id": {
                            "type": "long"
                        },
                        "isDefaultForCurrency": {
                            "type": "boolean"
                        },
                        "name": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "status": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "updatedAt": {
                            "type": "date"
                        }
                    }
                },
                "recommendedRetailPrice": {
                    "properties": {
                        "currency": {
                            "properties": {
                                "code": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "id": {
                                    "type": "long"
                                },
                                "name": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                }
                            }
                        },
                        "value": {
                            "type": "long"
                        }
                    }
                }
            }
        },
        "shortDescription": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "status": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "tags": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "updatedAt": {
            "type": "date"
        },
        "uri": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        }
    }
}