/**
 * @name Command injection
 * @description Using unsanitized user input in a system command can lead to command injection.
 * @kind path-problem
 * @problem.severity error
 * @security-severity 9.8
 * @precision high
 * @id js/command-injection
 * @tags security
 *       external/cwe/cwe-078
 */

import javascript
import DataFlow::PathGraph
import semmle.javascript.security.dataflow.CommandInjectionQuery

from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "This command depends on $@, which may contain malicious commands.",
  source.getNode(), "a user-provided value"
