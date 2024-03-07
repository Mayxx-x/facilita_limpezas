'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


export const Visitacao = (clientes) => {
    const url = 'https://api.openrouteservice.org/v2/directions/driving-car/json'

    // console.log('Clientes: ', clientes )

    return (<>
        <DialogContent className='min-w-[50rem]'>
            <DialogHeader>
                <DialogTitle> Rota de Visitação: </DialogTitle>
                <DialogDescription>
                    Rota passando por todos os clientes e retornando a empresa:
                </DialogDescription>
            </DialogHeader>

            <RotasMap />
        </DialogContent>
    </>)
}

const RotasMap = () => {
    // State for map center and zoom
    const [mapCenter, setMapCenter] = useState([-23.5469668, -46.6590575]); //* Coordenadas da Sede da Empresa | Facilita Limpezas
    const [zoomLevel, setZoomLevel] = useState(13);

    //* Inicialização do mapa
    useEffect(() => {
        const map = L.map('map').setView(mapCenter, zoomLevel);

        // Add base map tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker (optional)
        L.marker(mapCenter).addTo(map).bindPopup('Partindo Daqui').openPopup();

        // Cleanup function (optional)
        return () => map.remove();
    }, [mapCenter, zoomLevel]);

    return (
        <div id="map" className="w-[45rem] aspect-video" />
    );
};  