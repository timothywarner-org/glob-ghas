/**
 * @name Hard-coded credentials
 * @description Credentials are hard coded in the source code.
 * @kind problem
 * @problem.severity error
 * @security-severity 9.8
 * @precision medium
 * @id js/hardcoded-credentials
 * @tags security
 *       external/cwe/cwe-798
 */

import javascript
import semmle.javascript.security.SensitiveActions

from CredentialsExpr credentials
select credentials, "Hard-coded credentials."
