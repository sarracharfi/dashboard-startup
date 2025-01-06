import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { BsPencilSquare } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiExpense } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import { IoTimerOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Mycontext } from '../../App';
import DashbordBox from './components/dashbordBox';

const ITEM_HEIGHT = 48;

const data = [
    ["Year", "Sales", "Expenses"],
    ["2020", 15000, 10000],
    ["2021", 17000, 12000],
    ["2022", 19000, 13000],
    ["2023", 21000, 14000],
    ["2024", 23000, 15000],
];

const options = {
    title: "Evaluations Annuelles",
    backgroundColor: 'transparent',
    chartArea: { width: '100%', height: '80%' },
};

const Dashbord = () => {
    const context = useContext(Mycontext);
   
    useEffect(() => {
        context.setisHideSidebarAndHeader(false);
        window.scroll({ top: 0, left: 0, });
    }, [context]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setShowBy] = useState('');
    const [partners, setPartners] = useState([
        { id: 1, name: "APII", role: "Coordinateur du réseau", services: "Accompagnement personnalisé, transfert de technologies, soutien aux projets R&D", category: "Accompagnement et Support" },
        { id: 2, name: "CEPEX", role: "Soutien à l'exportation", services: "Aide à l'exportation, accès à de nouveaux marchés", category: "Exportation et Marchés" },
        { id: 3, name: "S2T", role: "Support technologique et innovation", services: "Assistance technologique, soutien à l'innovation, incubation", category: "Technologie et Innovation" },
        { id: 4, name: "UTICA", role: "Soutien aux entreprises", services: "Support à l'innovation, expansion vers les marchés européens", category: "Accompagnement et Support" },
        { id: 5, name: "CONECT", role: "Soutien à l’entrepreneuriat", services: "Accompagnement des entreprises, responsabilité sociétale", category: "Accompagnement et Support" },
        { id: 6, name: "CCIT", role: "Facilitation des contacts d’affaires", services: "Mise en relation avec des partenaires commerciaux", category: "Exportation et Marchés" },
        { id: 7, name: "ANME", role: "Soutien à la maîtrise de l’énergie", services: "Assistance en gestion de l'énergie, respect de l'environnement", category: "Gestion de l’Énergie et Environnement" },
        { id: 8, name: "CITET", role: "Soutien environnemental", services: "Accompagnement en technologies environnementales, gestion durable", category: "Gestion de l’Énergie et Environnement" },
        { id: 9, name: "CETIME", role: "Soutien technique aux industries mécaniques et électriques", services: "Assistance technique, soutien à l'innovation dans les secteurs mécanique et électrique", category: "Technologie et Innovation" },
    ]);
    const [selectedPartner, setSelectedPartner] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setShowBy(event.target.value);
    };

    const handleAddPartner = (newPartner) => {
        setPartners([...partners, { id: partners.length + 1, ...newPartner }]);
    };

    const handleEditPartner = (updatedPartner) => {
        setPartners(partners.map(partner => partner.id === updatedPartner.id ? updatedPartner : partner));
        setSelectedPartner(null);
    };

    const handleDeletePartner = (id) => {
        setPartners(partners.filter(partner => partner.id !== id));
    };

    const handleSelectPartner = (partner) => {
        setSelectedPartner(partner);
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="row dashbordBoxWrapperRow">
                    <div className="col-md-8">
                        <div className="dashbordBoxWrapper d-flex flex-wrap">
                            <DashbordBox 
                                color={["#ffc0cb", "#da70d6"]} 
                                icon={<FaMoneyBillTrendUp />} 
                                title="Dépenses Salaires" 
                                amount="7 145 mDT" 
                                grow={true}
                            />
                            <DashbordBox 
                                color={["#4169e1", "#db7093"]} 
                                icon={<GiExpense />} 
                                title="Dépenses Gestion" 
                                amount="63 500 mDT"
                                grow={false}
                            />
                            <DashbordBox 
                                color={["#f08080", "#add8e6"]} 
                                icon={<FcMoneyTransfer />} 
                                title="Dépenses d’Intervention" 
                                amount="55 130 mDT"
                                grow={false}
                            />
                            <DashbordBox 
                                color={["#20b2aa", "#1e90ff"]} 
                                icon={<GrMoney />} 
                                title="Dépenses Investissement" 
                                amount="144 275 mDT"
                                grow={true}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 pl-0">
                        <div className="box graphBox" style={{ 
                            background: 'linear-gradient(to right, #e9967a, #ff69b4)', 
                            color: 'white', 
                            padding: '20px', 
                            borderRadius: '8px',
                            position: 'relative'
                        }}>
                            <div>
                                <h4>Budget Total</h4>
                                <h3 className='text-white font-weight-bold'>18 500 mDT</h3>
                                <p>18 500 mDT in last year</p>

                                <Chart
                                    chartType='PieChart'
                                    width="100%"
                                    height="200px"
                                    data={data}
                                    options={options}
                                />
                            </div>
                            <Button 
                                className="toggleIcon" 
                                onClick={handleClick} 
                                style={{ position: 'absolute', top: '10px', right: '10px' }}
                            >
                                <HiDotsVertical />
                            </Button>
                            <Menu
                                id="dropdown_menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                <MenuItem onClick={handleClose}><IoTimerOutline /> Last Day</MenuItem>
                                <MenuItem onClick={handleClose}><IoTimerOutline /> Last Week</MenuItem>
                                <MenuItem onClick={handleClose}><IoTimerOutline /> Last Month</MenuItem>
                                <MenuItem onClick={handleClose}><IoTimerOutline /> Last Year</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>

                <div className='card shadow border-0 p-3 mt-4'>
                    <h3 className='hd'>Partenaires du Réseau EEN Tunisie</h3>
                    <div className='row cardFilters mt-3'>
                        <div className='col-md-3'>
                            <h4>Show by</h4>
                            <FormControl size="small" className='w-100'>
                                <Select
                                    value={showBy}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId='demo-select-small-label'
                                    className='w100'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Option 1</MenuItem>
                                    <MenuItem value={20}>Option 2</MenuItem>
                                    <MenuItem value={30}>Option 3</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='col-md-3'>
                            <h4>Category by</h4>
                            <FormControl size="small" className='w-100'>
                                <Select
                                    value={showBy}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId='demo-select-small-label'
                                    className='w100'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Category 1</MenuItem>
                                    <MenuItem value={20}>Category 2</MenuItem>
                                    <MenuItem value={30}>Category 3</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <table className='table mt-4'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Services</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partners.map((partner) => (
                                <tr key={partner.id}>
                                    <td>#{partner.id}</td>
                                    <td>{partner.name}</td>
                                    <td>{partner.role}</td>
                                    <td>{partner.services}</td>
                                    <td>{partner.category}</td>
                                    <td>
                                        <div className='actions d-flex align-items-center'>
                                            <Button className='success' color='success' onClick={() => handleSelectPartner(partner)}>
                                                <BsPencilSquare />
                                            </Button>
                                            <Button className='error' color='error' onClick={() => handleDeletePartner(partner.id)}>
                                                <MdDelete />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        count={10}
                        color="primary"
                        className='mt-4'
                    />
                </div>

                {/* Add/Edit Partner Form */}
                {selectedPartner && (
                    <PartnerForm 
                        partner={selectedPartner} 
                        onSave={handleEditPartner} 
                        onCancel={() => setSelectedPartner(null)} 
                    />
                )}
                <Button 
                    className='add-button'
                    onClick={() => handleSelectPartner({ name: '', role: '', services: '', category: '' })}
                >
                    Ajouter nouvelle partenaire
                </Button>
            </div>
        </>
    );
};

const PartnerForm = ({ partner, onSave, onCancel }) => {
    const [formData, setFormData] = useState(partner);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className='partenaire-form'>
            <h3>{formData.id ? 'modifier Partenaire' : 'ajouter Partenaire'}</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required
                />
                <input 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    placeholder="Role" 
                    required
                />
                <input 
                    name="services" 
                    value={formData.services} 
                    onChange={handleChange} 
                    placeholder="Services" 
                    required
                />
                <input 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    placeholder="Category" 
                    required
                />
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={onCancel}>Annuler</button>
            </form>
        </div>
    );
};

export default Dashbord;
