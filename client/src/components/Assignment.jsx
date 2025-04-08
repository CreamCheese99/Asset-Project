import React from 'react'

function Assignment() {





  return (
    <div>Assignment



        <div>
          <label className="input-label">ผู้รับผิดชอบ</label>
          <input
            type="text"
            className="input-field"
            placeholder="ผู้รับผิดชอบ"
            value={value.responsible_person}
            onChange={(e) => onChange("responsible_person", e.target.value)}
          />
        </div>
    </div>
    
  )


}

export default Assignment