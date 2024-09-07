import LoggedIn from '../models/loggedInModel.js';
import Lobby from '../models/lobbyModel.js';
import express from 'express';
import Create from "../models/createLobby.js"
const router = express.Router();

router.delete('/logout', async (req, res) => {
    const { teamId, lobbyId } = req.body;

    try {
        const user = await LoggedIn.findOne({ lobbyId, teamId });
        const currLobby = await Lobby.findOne({ lobbyId });
        const user1 = await Create.findOne({lobbyId});
        if (!user) {
            return res.status(404).json({ message: 'User not found in the lobby.' });
        }

        await LoggedIn.findByIdAndDelete(user._id);
        await Create.findByIdAndDelete(user._id);
        await Create.updateOne(
            {lobbyId},
            {$inc:{loginCount :-1}}
        )
        
        return res.status(200).json({ message: 'Team logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error); 
        return res.status(500).json({ message: 'Error occurred while logging out', error: error.message });
    }
});

export default router;
