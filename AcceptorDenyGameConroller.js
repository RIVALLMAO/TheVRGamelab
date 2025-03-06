const Game = require('../models/gameModel');  // Import your Game model
const { sendDiscordNotification } = require('../utils/discordNotification');  // Import Discord notification function

const approveDenyGameController = async (req, res) => {
  const { gameId } = req.params;  // Game ID from the URL parameters
  const { approved } = req.body;  // Approval status (true or false) from the request body

  try {
    // Find the game by its ID
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update the approval status of the game
    game.approved = approved;
    await game.save();

    // Send a Discord notification with the status of the game
    if (approved) {
      await sendDiscordNotification(game, 'approved');
    } else {
      await sendDiscordNotification(game, 'denied');
    }

    // Respond with a success message
    res.status(200).json({ message: approved ? 'Game approved' : 'Game denied' });
  } catch (error) {
    console.error('Error approving/denying game:', error);
    res.status(500).json({ message: 'Failed to update game status' });
  }
};

module.exports = { approveDenyGameController };
