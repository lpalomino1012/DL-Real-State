import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.post("/api/quote", async (req, res) => {
    const { formData, selectedServices, servicesList } = req.body;

    console.log("Received quote request:", formData);

    const recipientEmail = "contact@dlrealstate.com";
    
    // Configure transporter
    // Note: In a real production environment, these would be set in environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const servicesText = selectedServices
      .map((id: string) => {
        const s = servicesList.find((item: any) => item.id === id);
        return `- ${s?.title || id}`;
      })
      .join("\n");

    const commonAreasText = Object.entries(formData.commonAreas)
      .filter(([_, data]: any) => data.selected)
      .map(([id, data]: any) => `- ${id}: ${data.quantity}`)
      .join("\n");

    const personnelText = Object.entries(formData.personnel)
      .filter(([_, qty]: any) => qty > 0)
      .map(([name, qty]: any) => `- ${name}: ${qty}`)
      .join("\n");

    const emailBody = `
NUEVA SOLICITUD DE COTIZACIÓN - DL REAL STATE

DATOS DEL CLIENTE:
------------------
Nombre: ${formData.name}
Correo: ${formData.email}
Teléfono: ${formData.phone}
Ubicación: ${formData.country}, ${formData.city} - ${formData.district}

INFORMACIÓN DE LA EDIFICACIÓN:
------------------------------
Tipo: ${formData.buildingType}
Torres: ${formData.towers}
Unidades/Deptos: ${formData.units}
Estacionamientos: ${formData.parking}
Depósitos: ${formData.storage}
Pisos: ${formData.floors}
Oficinas: ${formData.offices}

SERVICIOS SOLICITADOS:
----------------------
${servicesText}

ÁREAS COMUNES:
--------------
${commonAreasText || "Ninguna seleccionada"}

PERSONAL REQUERIDO:
-------------------
${personnelText || "Ninguno especificado"}

COMENTARIOS ADICIONALES:
------------------------
${formData.comments || "Sin comentarios"}
    `;

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"DL Real State Web" <${process.env.SMTP_USER}>`,
          to: recipientEmail,
          subject: `Nueva Cotización: ${formData.name} - ${formData.buildingType}`,
          text: emailBody,
        });
        console.log("Email sent successfully to", recipientEmail);
      } else {
        console.warn("SMTP credentials not provided. Email not sent, but request received.");
        console.log("Email Content would have been:\n", emailBody);
      }
      
      res.json({ success: true, message: "Solicitud procesada correctamente" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Error al procesar la solicitud" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("Received contact message from:", name);

    const recipientEmail = "contact@dlrealstate.com";
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailBody = `
NUEVO MENSAJE DE CONTACTO - DL REAL STATE

Nombre: ${name}
Correo: ${email}

Mensaje:
${message}
    `;

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"DL Real State Web" <${process.env.SMTP_USER}>`,
          to: recipientEmail,
          subject: `Nuevo Mensaje de Contacto: ${name}`,
          text: emailBody,
        });
      } else {
        console.warn("SMTP credentials not provided. Email not sent, but message received.");
        console.log("Email Content would have been:\n", emailBody);
      }
      
      res.json({ success: true, message: "Mensaje enviado correctamente" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Error al enviar el mensaje" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
