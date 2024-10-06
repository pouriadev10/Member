import React, { useState, useEffect } from "react";
import { Controller } from "Controller/Controller";
import {
    Box,
    SimpleGrid,
    Select,
    Input,
    Text,
    Button,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    FormErrorMessage
} from "@chakra-ui/react";
import { message } from "antd";

const CreateBusiness = () => {
    const [category, setCategory] = useState([{ id: 1, name: "cloud_computing" }]);
    const [business, setBusiness] = useState({
        name: "",
        category: "",
        employees_number: "less_than_10",
        offices_number: 0,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusiness({
            ...business,
            [name]: value,
        });
    };

    const validate = () => {
        let errors = {};
        if (!business.name) {
            errors.name = "Name is required";
        }
        if (!business.category) {
            errors.category = "Category is required";
        }
        if (!business.employees_number) {
            errors.employees_number = "Number of employees is required";
        }
        return errors;
    };

    const handleCreateBusiness = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const response = await Controller.CreateBusiness(business);
        if (response.status < 250) {
            message.success("Business has been created successfully.");
            window.location.reload();
        } else {
            const backendErrors = {};
            if (response.name) {
                backendErrors.name = response.name;
            }
            if (response.category) {
                backendErrors.category = response.category;
            }
            if (response.employees_number) {
                backendErrors.employees_number = response.employees_number;
            }
            if (response.detail) {
                message.error(response.detail);
            } else if (!response.name && !response.category && !response.employees_number) {
                message.error("Error creating business");
            }
            setErrors(backendErrors);
        }
    };

    const getCategory = async () => {
        const response = await Controller.getAllCategoryBusiness();
        console.log(response.json);
        setCategory(response.json);
    };

    useEffect(() => {
        getCategory();
    }, []);

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid>
                <Box
                    bg="white"
                    p={5}
                    borderRadius="md"
                    boxShadow="md"
                    margin="5%"
                    minWidth={windowDimensions.width > 600 ? "500px" : ""}
                >
                    <Heading as="h2" size="xl" mb={6}>
                        Create Business
                    </Heading>
                    <VStack spacing={4}>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                onChange={handleChange}
                                name="name"
                                placeholder="Name of Your Business"
                                value={business.name}
                                variant="outline"
                            />
                            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={errors.category}>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onChange={(e) => {
                                    setBusiness({
                                        ...business,
                                        category: e.target.value,
                                    });
                                }}
                                placeholder="Category of Your Business"
                                variant="outline"
                                value={business.category}
                            >
                                {category.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.category && <FormErrorMessage>{errors.category}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={errors.employees_number}>
                            <FormLabel>Number of Employees</FormLabel>
                            <Select
                                onChange={(e) => {
                                    setBusiness({
                                        ...business,
                                        employees_number: e.target.value,
                                    });
                                }}
                                value={business.employees_number}
                                variant="outline"
                            >
                                <option value="less_than_10">Less than 10</option>
                                <option value="10_to_50">10 to 50</option>
                                <option value="more_than_50">More than 50</option>
                            </Select>
                            {errors.employees_number && (
                                <FormErrorMessage>{errors.employees_number}</FormErrorMessage>
                            )}
                        </FormControl>
                        <Box display="flex" justifyContent="flex-end" width="100%" mt={6}>
                            <Button onClick={handleCreateBusiness} colorScheme="blue">
                                Create
                            </Button>
                        </Box>
                    </VStack>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default CreateBusiness;
