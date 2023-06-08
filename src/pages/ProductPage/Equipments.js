import { useEffect, useState } from "react";
import { SPOONACULAR_API_KEY } from "../../apiKey.js";

function Equipments({ id }) {
    const [equipments, setEquipments] = useState();
    console.log(id);
    useEffect(() => {
        if (id) {
            getEquipments();
        }
    }, [id])

    const getEquipments = async () => {
        const check = localStorage.getItem(`equipment-${id}`);

        if (check) {
            setEquipments(JSON.parse(check));
            console.log(JSON.parse(check));
        }
        else {

            const api = await fetch(`https://api.spoonacular.com/recipes/${id}/equipmentWidget.json?apiKey=${SPOONACULAR_API_KEY}`);
            const data = await api.json();
            console.log(data.equipment);
            if (data && data.equipment) {
                localStorage.setItem(`equipment-${id}`, JSON.stringify(data.equipment));
                setEquipments(data.equipment);
            }
        }
    }


    return (
        id &&
        <div className="equipments-wrapper">
            {equipments && 
                equipments.map((equipment) => {
                    return (
                        <div key={`equip-${equipment.name}`}>
                            <img src={`https://spoonacular.com/cdn/equipment_100x100/${equipment.image}`} alt={equipment.name} />
                            <p>{equipment.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Equipments;
