package com.skillstorm.hrs.config;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.lang.NonNull;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;

@Configuration
@EnableMongoAuditing
@EnableMongoRepositories(basePackages = "com.skillstorm.hrs.repository")
public class DocumentDBConfig extends AbstractMongoClientConfiguration {

    @Value("${SPRING_DATA_MONGODB_URI:mongodb+srv://jumpstart:jumpstart@cluster0.xfvbu51.mongodb.net/hrs}")
    private String connectionString;

    @Override
    @NonNull
    protected String getDatabaseName() {
        String dbName = new ConnectionString(connectionString).getDatabase();
        return (dbName != null) ? dbName : "hrs";
    }

    @Override
    @NonNull
    public MongoClientSettings mongoClientSettings() {
        System.out.println("--- INITIALIZING DOCUMENTDB SSL SETTINGS (MULTI-CERT LOAD) ---");

        try {
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
            trustStore.load(null, null);

            try (InputStream is = getClass().getClassLoader().getResourceAsStream("global-bundle.pem")) {
                if (is == null) {
                    throw new RuntimeException("Could not find global-bundle.pem in resources!");
                }

                // Read ALL certificates from the bundle
                java.util.Collection<? extends java.security.cert.Certificate> certs = cf.generateCertificates(is);
                int i = 0;
                for (java.security.cert.Certificate cert : certs) {
                    trustStore.setCertificateEntry("caCert" + i, cert);
                    i++;
                }
                System.out.println("DEBUG: Successfully loaded " + i + " certificates from bundle.");
            }

            TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmf.init(trustStore);

            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, tmf.getTrustManagers(), null);

            return MongoClientSettings.builder()
                    .applyConnectionString(new ConnectionString(connectionString))
                    .applyToSslSettings(builder -> {
                        builder.enabled(true);
                        builder.context(sslContext);
                        // Try setting this to true if the handshake still fails
                        // to rule out hostname mismatch issues
                        builder.invalidHostNameAllowed(false);
                    })
                    .build();

        } catch (IOException | RuntimeException | KeyManagementException | KeyStoreException | NoSuchAlgorithmException
                | CertificateException e) {

            throw new RuntimeException("Failed to configure DocumentDB SSL", e);
        }
    }
}