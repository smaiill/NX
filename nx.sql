CREATE TABLE `nx_users` (
  `id` int(11) NOT NULL,
  `identifier` varchar(100) NOT NULL,
  `accounts` longtext DEFAULT '{"bank":0}',
  `permissions` varchar(50) DEFAULT 'user',
  `inventory` longtext DEFAULT NULL,
  `charinfo` longtext DEFAULT NULL,
  `position` varchar(255) DEFAULT '{"x":-269.4,"y":-955.3,"z":31.2,"heading":205.8}',
  `skin` longtext DEFAULT NULL,
  `uid` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `nx_users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `nx_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;


-- This is a test