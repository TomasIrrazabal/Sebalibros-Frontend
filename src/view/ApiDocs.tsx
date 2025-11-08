import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function ApiDocs() {
    const url = `${import.meta.env.VITE_API_URL}/docs/openapi.json`
    return (
        <div className="min-h-screen bg-white">
            <SwaggerUI
                url={url}
                docExpansion="list"
                defaultModelsExpandDepth={0}
                deepLinking
            />
        </div>
    )
}