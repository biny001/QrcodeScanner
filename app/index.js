import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner as BarcodeScanner } from "expo-barcode-scanner";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    async function getBarcode() {
      const { status } = await BarcodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    }
    getBarcode();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
  };

  const handleScanAgain = () => {
    setScanData(null);
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant permission to the app.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <BarcodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
        <View style={styles.overlay}>
          <View style={styles.box} />
        </View>
      </View>

      {scanData && (
        <View style={styles.scanResultContainer}>
          <View style={styles.scanResultCard}>
            <Text style={styles.scanResultText}>Scanned Data:</Text>
            <Text style={styles.scanResultData}>{scanData}</Text>
            <Button
              title="Scan Again"
              onPress={handleScanAgain}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  scannerContainer: {
    position: "relative",
    width,
    height: 300,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 250,
    height: 200,
    borderWidth: 2,
    borderColor: "#3e3e3e",
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  scanResultContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanResultCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: width * 0.75,
    maxHeight: height * 0.25,
  },
  scanResultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scanResultData: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Home;
