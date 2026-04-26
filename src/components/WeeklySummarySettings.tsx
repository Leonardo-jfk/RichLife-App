// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Switch,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useTheme } from "../context/ThemeContext";
// import { useLanguage } from "../context/LanguageContext";
// import IslandCard from "./IslandCard";
//
// const DAYS = [
//   { value: 0, label: "Dimanche" },
//   { value: 1, label: "Lundi" },
//   { value: 2, label: "Mardi" },
//   { value: 3, label: "Mercredi" },
//   { value: 4, label: "Jeudi" },
//   { value: 5, label: "Vendredi" },
//   { value: 6, label: "Samedi" },
// ];
//
// const HOURS = Array.from({ length: 24 }, (_, i) => ({ value: i, label: `${i}h` }));
// const MINUTES = Array.from({ length: 60 }, (_, i) => ({ value: i, label: `${i}min` }));
//
// interface WeeklySummarySettingsProps {
//   getEnabled: () => Promise<boolean>;
//   setEnabled: (enabled: boolean) => Promise<void>;
//   getSchedule: () => Promise<{ day: number; hour: number; minute: number }>;
//   setSchedule: (day: number, hour: number, minute: number) => Promise<void>;
//   sendTestSummary: () => Promise<void>;
// }
//
// export default function WeeklySummarySettings({
//   getEnabled,
//   setEnabled,
//   getSchedule,
//   setSchedule,
//   sendTestSummary,
// }: WeeklySummarySettingsProps) {
//   const { colors } = useTheme();
//   const { t } = useLanguage();
//
//   const [enabled, setEnabledState] = useState(false);
//   const [showPicker, setShowPicker] = useState(false);
//   const [selectedDay, setSelectedDay] = useState(6);
//   const [selectedHour, setSelectedHour] = useState(9);
//   const [selectedMinute, setSelectedMinute] = useState(0);
//   const [tempDay, setTempDay] = useState(6);
//   const [tempHour, setTempHour] = useState(9);
//   const [tempMinute, setTempMinute] = useState(0);
//
//   useEffect(() => {
//     loadSettings();
//   }, []);
//
//   const loadSettings = async () => {
//     const enabledStatus = await getEnabled();
//     const schedule = await getSchedule();
//     setEnabledState(enabledStatus);
//     setSelectedDay(schedule.day);
//     setSelectedHour(schedule.hour);
//     setSelectedMinute(schedule.minute);
//     setTempDay(schedule.day);
//     setTempHour(schedule.hour);
//     setTempMinute(schedule.minute);
//   };
//
//   const handleToggle = async (value: boolean) => {
//     setEnabledState(value);
//     await setEnabled(value);
//     if (value) {
//       Alert.alert("✅", "Résumé hebdomadaire activé ! Vous recevrez un résumé chaque semaine.");
//     } else {
//       Alert.alert("🔕", "Résumé hebdomadaire désactivé.");
//     }
//   };
//
//   const handleSaveSchedule = async () => {
//     await setSchedule(tempDay, tempHour, tempMinute);
//     setSelectedDay(tempDay);
//     setSelectedHour(tempHour);
//     setSelectedMinute(tempMinute);
//     setShowPicker(false);
//     Alert.alert("✅", "Planning du résumé hebdomadaire mis à jour !");
//   };
//
//   const handleTest = async () => {
//     await sendTestSummary();
//     Alert.alert("📊", "Un résumé de test a été envoyé !");
//   };
//
//   const getDayLabel = (day: number) => {
//     return DAYS.find(d => d.value === day)?.label || "Samedi";
//   };
//
//   return (
//     <IslandCard>
//       <View style={styles.header}>
//         <Ionicons name="calendar" size={22} color={colors.primary} />
//         <Text style={[styles.title, { color: colors.text }]}>
//           Résumé hebdomadaire
//         </Text>
//       </View>
//
//       <View style={styles.settingRow}>
//         <View style={styles.settingLeft}>
//           <Text style={[styles.settingLabel, { color: colors.text }]}>
//             Activer le résumé
//           </Text>
//           <Text style={[styles.settingDescription, { color: colors.textLight }]}>
//             Reçois un récapitulatif de tes finances chaque semaine
//           </Text>
//         </View>
//         <Switch
//           value={enabled}
//           onValueChange={handleToggle}
//           trackColor={{ false: "#767577", true: colors.primary }}
//           thumbColor={enabled ? "#fff" : "#f4f3f4"}
//         />
//       </View>
//
//       {enabled && (
//         <>
//           <TouchableOpacity
//             style={styles.scheduleButton}
//             onPress={() => setShowPicker(true)}
//           >
//             <View style={styles.scheduleInfo}>
//               <Ionicons name="time-outline" size={20} color={colors.primary} />
//               <Text style={[styles.scheduleText, { color: colors.text }]}>
//                 {getDayLabel(selectedDay)} à {selectedHour}h{selectedMinute.toString().padStart(2, '0')}
//               </Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color={colors.icon} />
//           </TouchableOpacity>
//
//           <TouchableOpacity style={styles.testButton} onPress={handleTest}>
//             <Ionicons name="send-outline" size={18} color={colors.primary} />
//             <Text style={[styles.testButtonText, { color: colors.primary }]}>
//               Envoyer un résumé de test
//             </Text>
//           </TouchableOpacity>
//         </>
//       )}
//
//       {/* Modal de sélection */}
//       <Modal
//         visible={showPicker}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowPicker(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
//             <View style={styles.modalHeader}>
//               <Text style={[styles.modalTitle, { color: colors.text }]}>
//                 Choisir le jour et l'heure
//               </Text>
//               <TouchableOpacity onPress={() => setShowPicker(false)}>
//                 <Ionicons name="close" size={24} color={colors.text} />
//               </TouchableOpacity>
//             </View>
//
//             <Text style={[styles.pickerLabel, { color: colors.text }]}>Jour</Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
//               {DAYS.map((day) => (
//                 <TouchableOpacity
//                   key={day.value}
//                   style={[
//                     styles.pickerItem,
//                     tempDay === day.value && { backgroundColor: colors.primary + "20", borderColor: colors.primary },
//                   ]}
//                   onPress={() => setTempDay(day.value)}
//                 >
//                   <Text style={[styles.pickerItemText, { color: tempDay === day.value ? colors.primary : colors.text }]}>
//                     {day.label}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//
//             <Text style={[styles.pickerLabel, { color: colors.text }]}>Heure</Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
//               {HOURS.map((hour) => (
//                 <TouchableOpacity
//                   key={hour.value}
//                   style={[
//                     styles.pickerItem,
//                     tempHour === hour.value && { backgroundColor: colors.primary + "20", borderColor: colors.primary },
//                   ]}
//                   onPress={() => setTempHour(hour.value)}
//                 >
//                   <Text style={[styles.pickerItemText, { color: tempHour === hour.value ? colors.primary : colors.text }]}>
//                     {hour.label}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//
//             <Text style={[styles.pickerLabel, { color: colors.text }]}>Minute</Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
//               {MINUTES.map((minute) => (
//                 <TouchableOpacity
//                   key={minute.value}
//                   style={[
//                     styles.pickerItem,
//                     tempMinute === minute.value && { backgroundColor: colors.primary + "20", borderColor: colors.primary },
//                   ]}
//                   onPress={() => setTempMinute(minute.value)}
//                 >
//                   <Text style={[styles.pickerItemText, { color: tempMinute === minute.value ? colors.primary : colors.text }]}>
//                     {minute.label}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setShowPicker(false)}
//               >
//                 <Text style={{ color: colors.text }}>Annuler</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.saveButton, { backgroundColor: colors.primary }]}
//                 onPress={handleSaveSchedule}
//               >
//                 <Text style={{ color: "white" }}>Enregistrer</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </IslandCard>
//   );
// }
//
// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   settingRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 8,
//   },
//   settingLeft: {
//     flex: 1,
//     marginRight: 16,
//   },
//   settingLabel: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   settingDescription: {
//     fontSize: 12,
//     marginTop: 2,
//   },
//   scheduleButton: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//     marginTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(0,0,0,0.1)",
//   },
//   scheduleInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   scheduleText: {
//     fontSize: 14,
//   },
//   testButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     marginTop: 12,
//     paddingVertical: 10,
//     borderRadius: 8,
//     backgroundColor: "rgba(99,102,241,0.1)",
//   },
//   testButtonText: {
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "90%",
//     borderRadius: 20,
//     padding: 20,
//     maxHeight: "80%",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   pickerLabel: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginTop: 12,
//     marginBottom: 8,
//   },
//   pickerScroll: {
//     flexDirection: "row",
//     marginBottom: 8,
//   },
//   pickerItem: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: "rgba(0,0,0,0.1)",
//   },
//   pickerItemText: {
//     fontSize: 14,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//     gap: 12,
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   cancelButton: {
//     backgroundColor: "rgba(0,0,0,0.05)",
//   },
//   saveButton: {
//     backgroundColor: "#6366F1",
//   },
// });






import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import IslandCard from "./IslandCard";

const DAYS = [
  { value: 0, label: "Dimanche" },
  { value: 1, label: "Lundi" },
  { value: 2, label: "Mardi" },
  { value: 3, label: "Mercredi" },
  { value: 4, label: "Jeudi" },
  { value: 5, label: "Vendredi" },
  { value: 6, label: "Samedi" },
];

const HOURS = Array.from({ length: 24 }, (_, i) => ({ value: i, label: `${i}h` }));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({ value: i, label: `${i}min` }));

interface WeeklySummarySettingsProps {
  getEnabled: () => Promise<boolean>;
  setEnabled: (enabled: boolean) => Promise<void>;
  getSchedule: () => Promise<{ day: number; hour: number; minute: number }>;
  setSchedule: (day: number, hour: number, minute: number) => Promise<void>;
  sendTestSummary: () => Promise<void>;
}

export default function WeeklySummarySettings({
  getEnabled,
  setEnabled,
  getSchedule,
  setSchedule,
  sendTestSummary,
}: WeeklySummarySettingsProps) {
  const { colors } = useTheme();
  // const { t } = useLanguage(); // 🔥 Supprimé car non utilisé

  const [enabled, setEnabledState] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(6);
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [tempDay, setTempDay] = useState(6);
  const [tempHour, setTempHour] = useState(9);
  const [tempMinute, setTempMinute] = useState(0);

  // loadSettings définie avec useCallback pour éviter les re-créations inutiles
  const loadSettings = useCallback(async () => {
    const enabledStatus = await getEnabled();
    const schedule = await getSchedule();
    setEnabledState(enabledStatus);
    setSelectedDay(schedule.day);
    setSelectedHour(schedule.hour);
    setSelectedMinute(schedule.minute);
    setTempDay(schedule.day);
    setTempHour(schedule.hour);
    setTempMinute(schedule.minute);
  }, [getEnabled, getSchedule]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]); // ✅ dépendance correcte

  const handleToggle = async (value: boolean) => {
    setEnabledState(value);
    await setEnabled(value);
    if (value) {
      Alert.alert("✅", "Résumé hebdomadaire activé ! Vous recevrez un résumé chaque semaine.");
    } else {
      Alert.alert("🔕", "Résumé hebdomadaire désactivé.");
    }
  };

  const handleSaveSchedule = async () => {
    await setSchedule(tempDay, tempHour, tempMinute);
    setSelectedDay(tempDay);
    setSelectedHour(tempHour);
    setSelectedMinute(tempMinute);
    setShowPicker(false);
    Alert.alert("✅", "Planning du résumé hebdomadaire mis à jour !");
  };

  const handleTest = async () => {
    await sendTestSummary();
    Alert.alert("📊", "Un résumé de test a été envoyé !");
  };

  const getDayLabel = (day: number) => {
    return DAYS.find(d => d.value === day)?.label || "Samedi";
  };

  return (
    <IslandCard>
      <View style={styles.header}>
        <Ionicons name="calendar" size={22} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          Résumé hebdomadaire
        </Text>
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingLeft}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Activer le résumé
          </Text>
          <Text style={[styles.settingDescription, { color: colors.textLight }]}>
            Reçois un récapitulatif de tes finances chaque semaine
          </Text>
        </View>
        <Switch
          value={enabled}
          onValueChange={handleToggle}
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={enabled ? "#fff" : "#f4f3f4"}
        />
      </View>

      {enabled && (
        <>
          <TouchableOpacity
            style={styles.scheduleButton}
            onPress={() => setShowPicker(true)}
          >
            <View style={styles.scheduleInfo}>
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <Text style={[styles.scheduleText, { color: colors.text }]}>
                {getDayLabel(selectedDay)} à {selectedHour}h{selectedMinute.toString().padStart(2, '0')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.testButton} onPress={handleTest}>
            <Ionicons name="send-outline" size={18} color={colors.primary} />
            <Text style={[styles.testButtonText, { color: colors.primary }]}>
              Envoyer un résumé de test
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Modal de sélection */}
      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Choisir le jour et l&apos;heure
              </Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.pickerLabel, { color: colors.text }]}>Jour</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
              {DAYS.map((day) => (
                <TouchableOpacity
                  key={day.value}
                  style={[
                    styles.pickerItem,
                    tempDay === day.value && { backgroundColor: colors.primary + "20", borderColor: colors.primary },
                  ]}
                  onPress={() => setTempDay(day.value)}
                >
                  <Text style={[styles.pickerItemText, { color: tempDay === day.value ? colors.primary : colors.text }]}>
                    {day.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.pickerLabel, { color: colors.text }]}>Heure</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
              {HOURS.map((hour) => (
                <TouchableOpacity
                  key={hour.value}
                  style={[
                    styles.pickerItem,
                    tempHour === hour.value && { backgroundColor: colors.primary + "20", borderColor: colors.primary },
                  ]}
                  onPress={() => setTempHour(hour.value)}
                >
                  <Text style={[styles.pickerItemText, { color: tempHour === hour.value ? colors.primary : colors.text }]}>
                    {hour.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.pickerLabel, { color: colors.text }]}>Minute</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
              {MINUTES.map((minute) => (
                <TouchableOpacity
                  key={minute.value}
                  style={[
                    styles.pickerItem,
                    tempMinute === minute.value && { backgroundColor: colors.primary + "20", borderColor: colors.primary },
                  ]}
                  onPress={() => setTempMinute(minute.value)}
                >
                  <Text style={[styles.pickerItemText, { color: tempMinute === minute.value ? colors.primary : colors.text }]}>
                    {minute.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowPicker(false)}
              >
                <Text style={{ color: colors.text }}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={handleSaveSchedule}
              >
                <Text style={{ color: "white" }}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </IslandCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  settingLeft: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  scheduleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  scheduleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scheduleText: {
    fontSize: 14,
  },
  testButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "rgba(99,102,241,0.1)",
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
  pickerScroll: {
    flexDirection: "row",
    marginBottom: 8,
  },
  pickerItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  pickerItemText: {
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  saveButton: {
    backgroundColor: "#6366F1",
  },
});