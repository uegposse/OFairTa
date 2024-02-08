import { PencilSimpleLine, Trash } from "phosphor-react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import LogoImg from "../../assets/ofairta.png";
import { styles } from "../../screens/MyBanks";
import { ModalApp } from "../Modal";

interface BankTypes {
  id: string;
  name: string;
}

export const BankList = ({ banking, handleSelectedBank, onDelete }) => {
  const [isModalDeleteProductVisible, setIsModalDeleteProductVisible] =
    useState(false);
  return (
    <View style={styles.cardContainer}>
      {banking.map((bank: BankTypes) => (
        <>
          <TouchableOpacity
            onPress={() => {
              handleSelectedBank(bank.id);
            }}
            key={bank.id}
            style={styles.cardBanking}
          >
            <Image style={styles.cardBankingImg} source={LogoImg} />
            <Text style={styles.cardBankingTitle}>{bank.name}</Text>

            <View style={styles.footerButton}>
              <TouchableOpacity style={styles.buttonRemove}>
                <PencilSimpleLine size={25} color="#075E55" weight="duotone" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsModalDeleteProductVisible(true)}
                style={styles.buttonRemove}
              >
                <Trash size={25} color="#d46b71" weight="duotone" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <ModalApp
            isVisible={isModalDeleteProductVisible}
            onClose={() => setIsModalDeleteProductVisible(false)}
            title="Deseja realmente excluir a banca?"
            backgroundColor="#DFEDE9"
          >
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  onDelete(bank.id);
                  setIsModalDeleteProductVisible(false);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalDeleteProductVisible(false)}
                style={[styles.modalButton, { backgroundColor: "#019972" }]}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </ModalApp>
        </>
      ))}
    </View>
  );
};
