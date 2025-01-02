import MockingService from "../services/mocking.js";

const getMockingPets = async (req, res) => {
    const pets = await MockingService.generateMockingPets(100); 
    res.send({status: "success", payload: pets}); 
}

const getMockingUsers = async (req, res) => {
    const users = await MockingService.generateMockingUsers(50); 
    res.send({status: "success", payload: users});
}

export default {
    getMockingPets,
    getMockingUsers
}