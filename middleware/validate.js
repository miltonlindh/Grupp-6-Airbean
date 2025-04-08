

module.exports = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Användarnamn och lösenord krävs' });
    }
    if (password.length < 4) {
        return res.status(400).json({ error: 'Lösenordet måste vara minst 4 tecken långt' });
    }
    next();
};