import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is missing",
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        success: false,
        message: "You can't register the same company twice",
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return req.status(404).json({
        success: false,
        message: "company not found",
      });
    }
    return res.status(201).json({
      message: "Got all companies",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return req.status(404).json({
        success: false,
        message: "company not found",
      });
    }
    return res.status(200).json({
      company,
      message: "Company mil jee",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;

    const file = req.file;
    // cloudinary aayega idhar

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });

    if (!company) {
      return req.status(404).json({
        success: false,
        message: "company not found",
      });
    }
    return res.status(200).json({
      company,
      message: "Company info updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
