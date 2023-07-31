import fs from "fs";
import { resolve } from "path";
import express from "express";
import { createServer } from "vite";

( async () => {
    const app = express();

    const vite = await createServer( {
        base: "/",
        root: process.cwd(),
        server: {
            middlewareMode: true
        },
        appType: "custom"
    } );

    app.use( vite.middlewares );
    app.use( "*", async ( req, res ) => {
        const url = req.originalUrl;

        console.log( url );

        let template = fs.readFileSync( resolve( process.cwd(), "./frontend/index.html" ), "utf-8" );
        template = await vite.transformIndexHtml( url, template );
        
		res.status( 200 ).set( { "Content-Type": "text/html" } ).end( template );
    } );

    app.listen( 11451, () => {
        console.log( "server starts on: http://127.0.0.1:11451" );
    } )
} )();