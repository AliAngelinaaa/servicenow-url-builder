package main

import (
    "net/url"
    "strings"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.LoadHTMLGlob("templates/*.html")
    r.Static("/static", "./templates/static")

    r.GET("/", func(c *gin.Context) {
        c.HTML(200, "index.html", nil)
    })

    r.POST("/generate", func(c *gin.Context) {
        domain := c.PostForm("domain"+".service-now.com")
        table := c.PostForm("table")
        format := c.PostForm("format")
        columns := c.PostForm("columns")
        sort := c.PostForm("sort")
        filters := c.PostFormArray("filters[]")

        query := strings.Join(filters, "^")
        queryEscaped := url.QueryEscape(query)
        base := "https://" + domain + "/" + table + ".do?" + strings.ToUpper(format)
        fullURL := base + "&sysparm_query=" + queryEscaped

        if columns != "" {
            fullURL += "&sysparm_fields=" + url.QueryEscape(columns)
        }
        if sort != "" {
            fullURL += "&sysparm_orderby=" + url.QueryEscape(sort)
        }

        c.JSON(200, gin.H{
            "url": fullURL,
        })
    })

    r.Run(":8080")
}