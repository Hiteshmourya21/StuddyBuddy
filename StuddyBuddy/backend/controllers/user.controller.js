import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";
import Question from "../models/questions.model.js";
import StudyGroup from "../models/studyGroup.model.js";
import Resource from "../models/resource.model.js";

export const getSuggestedConnections = async (req, res) => {
    try {
        const currenUser = await User.findById(req.user.id).select("connections studyField");

        const suggestedUser = await User.find({
            _id: {
                $ne: req.user._id,
                $nin: currenUser.connections
            },
            studyField: currenUser.studyField // added condition for matching studyField
        })
        .select("name username profilePicture headline")
        .limit(3);

        
        res.json(suggestedUser)
    } catch (error) {
        console.error("Error in getSuggestedConnections controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error in getPublicProfile controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req, res) => {

    try {
		const allowedFields = [
			"name",
			"username",
			"headline",
			"about",
			"location",
			"profilePicture",
			"bannerImg",
			"skills",
			"experience",
			"education",
		];

		const updatedData = {};

		for (const field of allowedFields) {
			if (req.body[field]) {
				updatedData[field] = req.body[field];
			}
		}

        if(req.body.profilePicture){
            const result = await cloudinary.uploader.upload(req.body.profilePicture);
            updatedData.profilePicture = result.secure_url;
        }

        if(req.body.bannerImg){
            const result = await cloudinary.uploader.upload(req.body.bannerImg);
            updatedData.bannerImg = result.secure_url;
        }

        const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new : true }).select("-password");

        res.json(user);

    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log(userId);
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error in getUserById controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
    
export const getSearchResults = async (req, res) => {
    try {
        
        const { category, q } = req.query;
        if (!category || !q) {
            return res.status(400).json({ message: "Category and query are required" });
        }
        
        if (!["student", "post", "forum", "groups"].includes(category)) {
            return res.status(400).json({ message: "Invalid category" });
        }
        
        let results = [];
        
        if (category === "student") {
            results = await User.find({
                $or: [
                    { username: { $regex: q, $options: "i" } },
                    { name: { $regex: q, $options: "i" } }
                ]
            }).select("-password");
        }

        if (category === "post") {
            results = await Post.find({
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { content: { $regex: q, $options: "i" } }
                ]
            }).populate("author", "name username profilePicture headline").limit(10);
        }

        if (category === "forum") {
            results = await Question.find({
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } }
                ]
            }).populate("user", "name username profilePicture headline").limit(10);
        }

        if (category === "groups") {
            results = await StudyGroup.find({
                $or: [
                    { name: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } }
                ]
            });
        }

        return res.json(results);
    } catch (error) {
        console.error("Error in getSearchResults controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getResources = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        const resources = await Resource.find({user: user._id});
        res.json(resources);
    } catch (error) {
        console.error("Error in getResources controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const postResource = async (req, res) => {
    try {
        const userId = req.user._id;
        const {name, link} = req.body;
        const resource = await Resource.create({name, link, user: userId});
        await resource.save();
        res.json(resource);
    } catch (error) {
        console.error("Error in postResource controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteResource = async (req, res) => {
    try {
        const {resourceId} = req.params;
        const resource = await Resource.findByIdAndDelete(resourceId);
        res.json(resource);
    } catch (error) {
        console.error("Error in deleteResource controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const toggleLikeResource = async (req, res) => {
    try {
        const {resourceId} = req.params;
        const userId = req.user._id;
        const resource = await Resource.findById(resourceId);
        if (resource.likes.includes(userId)) {
            resource.likes.pull(userId);
        } else {
            resource.likes.push(userId);
        }
        await resource.save();
        res.json(resource);
    } catch (error) {
        console.error("Error in toggleLikeResource controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};