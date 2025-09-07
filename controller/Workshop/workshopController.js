const workshopModel = require('../../model/workshopSlug')
const Cloudinary = require('cloudinary')
const env = require('dotenv')
env.config()
// Configuration
Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class WorkshopController {
    // Step 1: One-time College Insert
    static createCollege = async (req, res) => {
        try {
            const { collegename, name, heading } = req.body;

            if (!collegename || !name || !heading) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const slug = collegename.toLowerCase().replace(/ /g, '-');

            // Check if already exists
            const exists = await workshopModel.findOne({ slug });
            if (exists) {
                return res.status(400).json({ message: "College already exists" });
            }

            const workshop = await workshopModel.create({
                collegename,
                slug,
                name,
                heading,
                image: []
            });

            res.status(201).json({
                success: true,
                message: "College created successfully",
                data: workshop
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static getAllColleges = async (req, res) => {
        try {
            const workshops = await workshopModel.find().select("-__v");
            res.status(200).json(workshops);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    // Step 3: Get all workshops by slug
    static getBySlug = async (req, res) => {
        try {
            const { slug } = req.params;
            const workshop = await workshopModel.findOne({ slug });

            if (!workshop) {
                return res.status(404).json({ message: "College not found" });
            }

            res.json(workshop);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    // Step 4: Update College by Slug
    static updateCollege = async (req, res) => {
        try {
            const { slug } = req.params;
            const { collegename, name, heading } = req.body;

            const college = await workshopModel.findOne({ slug });
            if (!college) {
                return res.status(404).json({ message: "College not found" });
            }

            // Update fields if provided
            if (collegename) {
                college.collegename = collegename;
                college.slug = collegename.toLowerCase().replace(/ /g, '-');
            }
            if (name) college.name = name;
            if (heading) college.heading = heading;

            await college.save();

            res.status(200).json(college);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    // Step 5: Delete College by Slug
    static deleteCollege = async (req, res) => {
        try {
            const { slug } = req.params;
            const deleted = await workshopModel.findOneAndDelete({ slug });
            if (!deleted) {
                return res.status(404).json({ message: "College not found" });
            }
            res.status(200).json({
                success: true,
                message: "College deleted successfully"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    // Step 2: Upload image by slug
    static uploadImage = async (req, res) => {
        try {
            const { slug } = req.params;

            if (!req.files || !req.files.image) {
                return res.status(400).json({ message: "Image file is required" });
            }

            const file = req.files.image;

            // Upload to Cloudinary
            const uploadResult = await Cloudinary.uploader.upload(file.tempFilePath, {
                folder: "Pninfosys_workshops"
            });

            // Push the new image into existing workshop document
            const workshop = await workshopModel.findOneAndUpdate(
                { slug },  // find the workshop by slug
                {
                    $push: {
                        image: {  // make sure this matches your schema
                            public_id: uploadResult.public_id,
                            url: uploadResult.secure_url
                        }
                    }
                },
                { new: true }  // return the updated document
            );

            if (!workshop) {
                return res.status(404).json({ message: "Workshop not found" });
            }

            res.json(workshop);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    };
    static deleteImage = async (req, res) => {
        try {
            const { slug } = req.params;
            const { imageId, public_id } = req.body;

            if (!imageId && !public_id) {
                return res.status(400).json({ message: "Provide imageId (Mongo _id) or public_id (Cloudinary)" });
            }

            // Workshop find karo
            const workshop = await workshopModel.findOne({ slug });
            if (!workshop) {
                return res.status(404).json({ message: "Workshop not found" });
            }

            // Image dhundo
            let image;
            if (imageId) {
                image = workshop.image.id(imageId); // Mongo subdocument _id se
            } else if (public_id) {
                image = workshop.image.find(img => img.public_id === public_id); // Cloudinary se
            }

            if (!image) {
                return res.status(404).json({ message: "Image not found in this workshop" });
            }

            // Cloudinary delete
            await Cloudinary.uploader.destroy(image.public_id);

            // MongoDB se delete
            workshop.image.pull({ _id: image._id });
            await workshop.save();

            res.json({ message: "Image deleted successfully", workshop });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    };

}

module.exports = WorkshopController