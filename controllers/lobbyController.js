const express = require("express");
const lobby = require("../models/gameLobbyModel");

exports.createLobby = async (req, res) => {
  try {
    const newLobby = new lobby(req.body);
    await newLobby.save();
    res.status(201).json({ message: "new lobby created" });
  } catch {
    res.status(500).json({ error: error.message });
  }
};
