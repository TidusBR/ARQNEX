import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { config } from '../../config';

export function ExperiencesInputs({ session, index, onChange }) {
    const data = session.account.experiences.find(experience => experience.experience_id === index);

    const [role, setRole] = useState(data?.role ?? "");
    const [company, setCompany] = useState(data?.company ?? "");
    const [companyPhone, setCompanyPhone] = useState(data?.companyPhone ?? "");
    const [remuneration, setRemuneration] = useState(data?.remuneration ?? "");
    const [admissionDate, setAdmissionDate] = useState(data?.admissionDate ?? "");
    const [departureDate, setDepartureDate] = useState(data?.departureDate ?? "");

    useEffect(() => {
        onChange({
            index,
            role,
            company,
            companyPhone,
            remuneration,
            admissionDate,
            departureDate
        });
    }, [onChange, index, role, company, companyPhone, remuneration, admissionDate, departureDate]);

    return (
        <div className="row">
            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor={"cargo-"+index}>Cargo</label>
                <input required type="text" id={"cargo-"+index} className="form-control form-control-md" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor={"empresa-"+index}>Empresa</label>
                <input required type="text" id={"empresa-"+index} className="form-control form-control-md" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"telEmpresa-"+index}>Telefone da empresa</label>
                <PhoneInput
                    id={"telEmpresa-"+index}
                    className="form-control form-control-md"
                    country="BR"
                    defaultCountry="BR"
                    countries={["BR"]}
                    addInternationalOption={false}
                    value={companyPhone}
                    onChange={setCompanyPhone}
                    limitMaxLength={true}
                    smartCaret={true}
                    countryCallingCodeEditable={false}
                    required
                />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"remuneracao-"+index}>Remuneração</label>
                <input required type="text" id={"remuneracao-"+index} className="form-control form-control-md" value={remuneration} onChange={(e) => setRemuneration(e.target.value)} />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"dataAdmissao-"+index}>Data de Admissão</label>
                <input required type="date" id={"dataAdmissao-"+index} className="form-control form-control-md" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"dataSaida-"+index}>Data de saída</label>
                <input required type="date" id={"dataSaida-"+index} className="form-control form-control-md" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            </div>
        </div>
    );
}

ExperiencesInputs.propTypes = {
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
}

export default function ExperiencesForm({ session, updateSession }) {
    const [experiencesCount, setExperiencesCount] = useState(Math.max(Math.min(session.account.experiences.length, 2), 1));
    const experiencesData = Array(experiencesCount).fill({});

    const handleSumbit = async (e) => {
        e.preventDefault();

        e.target.querySelector("button[type='submit']").disabled = true;

        await fetch(`${config.api}${config.endpoints.account.update.experiences}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(experiencesData)
        });

        updateSession();

        e.target.querySelector("button[type='submit']").disabled = false;
    }

    const addMoreExperiences = () => {
        if (experiencesCount >= 2)
            return;

        experiencesData.push({});
        setExperiencesCount(n => n + 1);
    }

    return (
        <form className="w-100 row" onSubmit={handleSumbit}>
            {
                Array(experiencesCount).fill().map(
                    (_, index) => <ExperiencesInputs session={session} index={index} key={index} onChange={(data) => experiencesData[data.index] = data} />
                )
            }

            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-between flex-column flex-md-row">
                        <button
                            className="btn btn-block col-12 col-md-4 mb-3 mb-md-0"
                            style={{ border: "dashed 1px #dee2e6" }}
                            id="addMore"
                            type="button"
                            onClick={addMoreExperiences}
                            disabled={experiencesCount >= 2}
                        >
                            Adicionar mais
                        </button>
                        <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="submit">Salvar</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

ExperiencesForm.propTypes = {
    updateSession: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
}