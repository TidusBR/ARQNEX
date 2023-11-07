import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { config } from '../../config';

export function FormationsInputs({ index, onChange, session }) {
    const data = session.account.formations.find(formation => formation.formation_id === index);

    const [education, setEducation] = useState(data?.education ?? "");
    const [formation, setFormation] = useState(data?.formation ?? "");
    const [institution, setInstitution] = useState(data?.institution ?? "");
    const [situation, setSituation] = useState(data?.situation ?? "");
    const [startYear, setStartYear] = useState(data?.startYear ?? new Date().getFullYear());
    const [endYear, setEndYear] = useState(data?.endYear ?? new Date().getFullYear());
    const [period, setPeriod] = useState(data?.period ?? "");
    const [semester, setSemester] = useState(data?.semester ?? "");

    useEffect(() => {
        onChange({
            index,
            education,
            formation,
            institution,
            situation,
            startYear,
            endYear,
            period,
            semester
        });
    }, [onChange, index, education, formation, institution, situation, startYear, endYear, period, semester]);

    return (
        <div className="row">
            { index > 0 && <div className="col-12 mt-1 mb-4" >
                <hr />
            </div> }
            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor={"escolaridade-"+index}>Escolaridade</label>
                <input required type="text" id={"escolaridade-"+index} className="form-control form-control-md" value={education} onChange={(e) => setEducation(e.target.value)} />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor={"formacao-"+index}>Formação</label>
                <input required type="text" id={"formacao-"+index} className="form-control form-control-md" value={formation} onChange={(e) => setFormation(e.target.value)} />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor={"escola-"+index}>Instituição de Ensino</label>
                <input required type="text" id={"escola-"+index} className="form-control form-control-md" value={institution} onChange={(e) => setInstitution(e.target.value)} />
            </div>

            <div className="mb-4 col-12">
                <label htmlFor={"situacao-"+index} className="fw-bold">Situação</label>
                <select required className="form-select" id={"situacao-"+index} value={situation} onChange={(e) => setSituation(e.target.value)}>
                    <option value="" hidden></option>
                    <option value="Incompleto">Incompleto</option>
                    <option value="Cursando">Cursando</option>
                    <option value="Completo">Completo</option>
                </select>
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"anoInicio-"+index}>Ano de ínicio</label>
                <input required type="number" id={"anoInicio-"+index} className="form-control form-control-md" value={String(startYear)} onChange={(e) => setStartYear(Number(e.target.value.slice(0, 4)))} />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"anoTermino-"+index}>Ano de Término</label>
                <input required type="number" id={"anoTermino-"+index} className="form-control form-control-md" value={String(endYear)} onChange={(e) => setEndYear(Number(e.target.value.slice(0, 4)))} />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"turno-"+index}>Turno</label>
                <input required type="text" id={"turno-"+index} className="form-control form-control-md" value={period} onChange={(e) => setPeriod(e.target.value)} />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor={"semestre-"+index}>Semestre</label>
                <input required type="text" id={"semestre-"+index} className="form-control form-control-md" value={semester} onChange={(e) => setSemester(e.target.value)} />
            </div>
        </div>
    );
}

FormationsInputs.propTypes = {
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
}

export default function FormationsForm({ session }) {
    const [formationCount, setFormationCount] = useState(Math.max(Math.min(session.account.formations.length, 3), 1));
    const formationData = Array(formationCount).fill({});

    const handleSumbit = async (e) => {
        e.preventDefault();

        e.target.querySelector("button[type='submit']").disabled = true;

        await fetch(`${config.api}${config.endpoints.account.update.education}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(formationData)
        });

        e.target.querySelector("button[type='submit']").disabled = false;
    }

    const addMoreFormation = () => {
        if (formationCount >= 3)
            return;

        formationData.push({});
        setFormationCount(n => n + 1);
    }

    return (
        <form className="w-100 row" onSubmit={handleSumbit}>
            {
                Array(formationCount).fill().map(
                    (_, index) => <FormationsInputs index={index} session={session} key={index} onChange={(data) => formationData[data.index] = data} />
                )
            }

            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-between flex-column flex-md-row">
                        <button
                            className="btn btn-block col-12 col-md-4 mb-3 mb-md-0"
                            style={{border: "dashed 1px #dee2e6"}}
                            type="button"
                            id="addMore"
                            onClick={addMoreFormation}
                            disabled={formationCount >= 3}
                        >Adicionar mais</button>
                        <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="submit">Salvar</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

FormationsForm.propTypes = {
    session: PropTypes.object.isRequired
}