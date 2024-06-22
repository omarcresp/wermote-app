package main

import "github.com/gin-gonic/gin"

func main() {
	router := gin.Default()

	router.GET("/auth", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "auth ms",
		})
	})

	router.Run() // Listen and serve on 0.0.0.0:8080
}

