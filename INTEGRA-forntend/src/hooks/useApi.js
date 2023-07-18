import { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import { getAuthToken } from './auth';

export const useEvents = (id) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/campaigns/showCampaignEvents/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEvents(data.data);
        } else {
          throw json({ message: 'Could not fetch Events.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return events;
};

export const useMarketingChart = () => {
  const [marketingChart1, setMarketingChart1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/campaigns/showCampaignsRevenues',
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMarketingChart1(data);
         
        } else {
          throw json({ message: 'Could not fetch Chart.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return marketingChart1;
};

export const useCampaignInfo = () => {
  const [marketingChart, setMarketingChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/campaigns/showCampaignsDetailsRevenue',
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMarketingChart(data);
        } else {
          throw json({ message: 'Could not fetch Chart.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return marketingChart;
};

export const usePermission = () => {
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/userManagement/permissions',
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setPermission(data.data);
        } else {
          throw json({ message: 'Could not fetch Permission.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return permission;
};

export const useRole = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/userManagement/roles',
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setRoles(data.data);
        } else {
          throw json({ message: 'Could not fetch Roles.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return roles;
};






export const useRolesPermission = (id) => {
  const [rolePermission, setRolePermission] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/userManagement/roles/rolePermissions/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setRolePermission(data.data);
        } else {
          throw json({ message: 'Could not fetch Roles Permissions.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return rolePermission;
};

export const useUserRole = (id) => {
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/userManagement/users/userRoles/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUserRole(data.data);
        } else {
          throw json({ message: 'Could not fetch Roles of user.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return userRole;
};


export const useTvs = (id) => {
  const [tvs, setTvs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/campaigns/showCampaignTvs/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTvs(data.data);
        } else {
          throw json({ message: 'Could not fetch Tvs.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return tvs;
};

export const useSocialMedia = (id) => {
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/campaigns/showCampaignSocialMedia/' +
            id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSocialMedia(data.data);
        } else {
          throw json(
            { message: 'Could not fetch social media.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return socialMedia;
};

export const useCampaign = (id) => {
  const [campaign, setCampaign] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/campaigns/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCampaign(data.data);
        } else {
          throw json({ message: 'Could not fetch Campaign.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return campaign;
};

export const useLeadsOfCampaign = (id) => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/campaigns/showCampaignLeads/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setLeads(data.data);
        } else {
          throw json({ message: 'Could not fetch Leads.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return leads;
};

export const useLeadsOfCustomer = (id) => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/customers/showCustomerLeads/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setLeads(data.data);
        } else {
          throw json({ message: 'Could not fetch Leads.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return leads;
};

export const useEmployeeBenefits = (id) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/hr/benefits/employeesBenefit/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEmployees(data);
        } else {
          throw json(
            { message: 'Could not fetch employee benefits.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return employees;
};

export const useCustomersOfLead = (id) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/leads/showLeadCustomers/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCustomers(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Customers.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return customers;
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/customers',
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCustomers(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Customers.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return customers;
};

export const useCampaignsOfLead = (id) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/marketing/leads/showLeadCampaigns/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCampaigns(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Campaigns.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return campaigns;
};

export const useLeads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch('http://localhost:8000/marketing/leads', {
          headers: {
            Authorization: 'bearer ' + token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setLeads(data.data);
        } else {
          throw json({ message: 'Could not fetch Leads.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return leads;
};

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/suppliers',
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSuppliers(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Suppliers.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return suppliers;
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/categories',
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCategories(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Categories.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return categories;
};

export const useGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/products/attributeGroups',
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setGroups(data.data);
        } else {
          throw json({ message: 'Could not fetch Groups.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return groups;
};

export const useEmployeesDetails = (id) => {
  const [employeeDetails, setEmployeeDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/hr/employees/employeeDetails/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEmployeeDetails(data[0]);
        } else {
          throw json(
            { message: 'Could not fetch Employees details.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return employeeDetails;
};

export const useDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch('http://localhost:8000/hr/departments', {
          headers: {
            Authorization: 'bearer ' + token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setDepartments(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Departments.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return departments;
};

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch('http://localhost:8000/hr/employees', {
          headers: {
            Authorization: 'bearer ' + token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setEmployees(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Employees.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return employees;
};

export const useDepartmentEmployees = (id) => {
  const [departmentEmployees, setDepartmentEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/hr/departmentEmployees/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setDepartmentEmployees(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Departments Employees.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return departmentEmployees;
};

export const useSupervisors = () => {
  const [Supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch('http://localhost:8000/hr/employees', {
          headers: {
            Authorization: 'bearer ' + token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setSupervisors(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Supervisors.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return Supervisors;
};

export const useAttributesGroup = (id) => {
  const [attributesGroup, setAttributesGroup] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/products/attributeGroups/attributesOfGroup/' +
            id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setAttributesGroup(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Attributes of Group.' },
            { status: 500 }
          );
        }
      } catch {}
    };

    fetchData();
  }, []);

  return attributesGroup;
};

export const useProductsByCategory = (id) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/categories/products/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Products by Category.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return products;
};

export const useProductsBySupplier = (id) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/suppliers/products/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data.data);
        } else {
          throw json(
            { message: 'Could not fetch Products by Supplier.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return products;
};

export const useProductStock = (id) => {
  const [productStock, setProductStock] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/products/' + id,
          {
            headers: {
              Authorization: 'bearer ' + token,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setProductStock(data.data.quantity_in_stock);
        } else {
          throw json(
            { message: 'Could not fetch Products by Supplier.' },
            { status: 500 }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return productStock;
};

export const useAttachDetachLeadToCampaign = (id, type) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        let url;
        if (type == 'attact') {
          url =
            'http://localhost:8000/marketing/campaigns/attachCampaignToLead/' +
            id;
        } else {
          url =
            'http://localhost:8000/marketing/campaigns/detachCampaignToLead/' +
            id;
        }
        const response = await fetch(url, {
          headers: {
            Authorization: 'bearer ' + token,
          },
        });

        const data = await response.json();

        if (!response.ok)
          throw json(
            { message: 'Could not add lead to campaign.' },
            { status: 500 }
          );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export const useProductsofImport = (id) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/prdoctsImports/productsByImportId/' +
            id,
          {
            headers: {
              Authorization: 'bearer' + token,
            },
          }
        );

        const { data } = await response.json();
        setProducts(data);
        if (!response.ok)
          throw json(
            { message: 'Could not fetch products of import.' },
            { status: 500 }
          );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return products;
};

export const useProductsOfExport = (id) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(
          'http://localhost:8000/repository/prdoctsExports/productsByExportId/' +
            id,
          {
            headers: {
              Authorization: 'bearer' + token,
            },
          }
        );

        const { data } = await response.json();
        setProducts(data);
        if (!response.ok)
          throw json(
            { message: 'Could not fetch products of export.' },
            { status: 500 }
          );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return products;
};

export const useAttachDetachEmployeeToBenefit = (id, type) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        let url;
        if (type == 'attach') {
          url =
            'http://localhost:8000/hr/benefits/attachCustomerToBenefit/' +
            id;
        } else {
          url =
            'http://localhost:8000/hr/benefits/detachCustomerToBenefit/' +
            id;
        }
        const response = await fetch(url, {
          headers: {
            Authorization: 'bearer ' + token,
          },
        });

        const data = await response.json();

        if (!response.ok)
          throw json(
            { message: 'Could not add employee to benefit.' },
            { status: 500 }
          );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return null;
};