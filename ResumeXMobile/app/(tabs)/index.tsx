import { View, Text, StyleSheet, Button, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import API from "../../services/api";

export default function HomeScreen() {
  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });

    if (!result.canceled) {
      const file = result.assets[0];

      const formData = new FormData();

      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/pdf",
      } as any);

      try {
        const response = await API.post("/upload-resume/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        Alert.alert(
          "ATS Analysis Complete",
          `ATS Score: ${response.data.ats_score}%\n\nSuggestions:\n${response.data.suggestions.join("\n")}`
        );
      } catch (error) {
        console.log(error);
        Alert.alert("Upload Failed", "Backend connection failed.");
      }
    }
  };

  const pickJD = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "text/plain",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });

    if (!result.canceled) {
      Alert.alert("Job Description Selected", result.assets[0].name);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ResumeX AI</Text>
      <Text style={styles.subtitle}>AI Resume ATS Analyzer</Text>

      <Button title="Upload Resume" onPress={pickResume} />

      <View style={{ marginTop: 20 }}>
        <Button title="Upload Job Description" onPress={pickJD} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#744115",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#a2b648",
    marginBottom: 40,
  },
});