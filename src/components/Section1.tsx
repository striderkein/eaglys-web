import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';

type Props = {
  sql: string,
  handleSqlChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
  handleTransformChange: () => void,
}

function Section1({
  sql,
  handleSqlChange,
  handleTransformChange
}: Props) {
  const [initialSql, setInitialSql] = useState('');
  const [selectedStatement, setSelectedStatement] = useState('SELECT');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [insertColumns, setInsertColumns] = useState('');
  const [insertValues, setInsertValues] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [setClause, setSetClause] = useState('');
  const [whereClause, setWhereClause] = useState('');

  const handleSqlTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const statement = event.target.value;

    if (selectedTable) {
      switch (statement) {
        case 'SELECT':
          setInitialSql(`SELECT ${selectedColumn} FROM ${selectedTable} ${whereClause ? `WHERE ${whereClause}` : ''}`);
          break;
        case 'INSERT':
          setInitialSql(`INSERT INTO ${selectedTable} (${insertColumns}) VALUES (${insertValues})`);
          break;
        case 'UPDATE':
          setInitialSql(`UPDATE ${selectedTable} SET ${setClause} ${whereClause ? `WHERE ${whereClause}` : ''}`);
          break;
        case 'DELETE':
          setInitialSql(`DELETE FROM ${selectedTable} ${whereClause ? `WHERE ${whereClause}` : ''}`);
          break;
        default:
          break;
      }
    }

    console.log(`initialSql: ${initialSql}`)
    setSelectedStatement(statement);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
}, [initialSql, selectedColumn, insertColumns, insertValues, selectedTable, setClause, whereClause, handleSqlChange]);

  const handleColumnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const column = event.target.value;
    setSelectedColumn(column);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleInsertColumnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const column = event.target.value;
    setInsertColumns(column);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleInsertValuesChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const insertValues = event.target.value;
    setInsertValues(insertValues);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleTableChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const table = event.target.value;
    setSelectedTable(table);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleSetClauseChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const setClause = event.target.value;
    setSetClause(setClause);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleWhereClauseChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const whereClause = event.target.value;
    setWhereClause(whereClause);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleClearClick = () => {
    setInitialSql('');
    setSelectedStatement('SELECT');
    setSelectedColumn('');
    setInsertColumns('');
    setInsertValues('');
    setSelectedTable('');
    setSetClause('');
    setWhereClause('');
    handleSqlChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  useEffect(() => {
    handleSqlTypeChange({ target: { value: selectedStatement } } as React.ChangeEvent<HTMLSelectElement>);
  }, [selectedStatement, handleSqlTypeChange]);

  return (
    <section className="section-1">
      <h2>SQL</h2>
      <div className="input-area">
        <span className="clause">
          <select value={selectedStatement} onChange={handleSqlTypeChange}>
            <option value="SELECT">SELECT</option>
            <option value="INSERT">INSERT</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
        </span>
        {selectedStatement === 'SELECT' && (
          <span className="clause">
            <input
              type="text"
              placeholder="*"
              value={selectedColumn}
              onInput={handleColumnChange as () => void}
            />
          </span>
        )}
        {selectedStatement === 'INSERT' ? (
          <span className="clause">INTO</span>
        ) : (
          <span className="clause">{selectedStatement === 'UPDATE' ? '' : 'FROM'}</span>
        )}
        <span className="clause">
          <input
            type="text"
            placeholder="my_table"
            value={selectedTable}
            onInput={handleTableChange as () => void}
          />
        </span>
        {selectedStatement === 'INSERT' && (
          <>
            <span className="clause">(</span>
            <span className="clause">
              <input
                type="text"
                placeholder="column1, column2"
                value={insertColumns}
                onInput={handleInsertColumnChange as () => void}
              />
            </span>
            <span className="clause">)</span>
          </>
        )}
        {selectedStatement === 'UPDATE' && (
          <>
            <span className="clause">SET</span>
            <span className="clause">
              <input
                type="text"
                placeholder="column1 = value1, column2 = value2"
                value={setClause}
                onInput={handleSetClauseChange as () => void}
              />
            </span>
          </>
        )}
        {selectedStatement === 'INSERT' ? (
          <>
            <span className="clause">VALUES</span>
            <span className="clause">(</span>
            <span className="clause">
              <input
                type="text"
                placeholder='value1, value2'
                value={insertValues}
                onInput={handleInsertValuesChange as () => void}
              />
            </span>
            <span className="clause">)</span>
          </>
        ) : (
          <span className="clause">
            <span className="clause">WHERE</span>
              <input
                type="text"
                placeholder='column1 = "value1"'
                value={whereClause}
                onInput={handleWhereClauseChange as () => void}
              />
          </span>
        )}
      </div>
      <div className="button-area">
        <button
          disabled={!selectedTable}
          onClick={handleTransformChange}
        >
          Transform SQL
        </button>
        <button
          disabled={!selectedTable}
          className="button" onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
    </section>
  );
}

export default Section1;
